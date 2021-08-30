import * as H from 'history'
import {BasicMap, PathParams} from '../CommonTypes';
import {generatePath} from 'react-router';

export type RouteId = string;

/**
 * Configuration of routes.
 */
export interface RouteConfig {
    routeId: RouteId;
    path: string;
    parent?: RouteConfig;
    children?: RouteConfig[];
}

export interface RouterType {
    initialize: (homeRouteId: RouteId, routeConfigs: RouteConfig[]) => void;
    navigate: (routeId: RouteId, pathParams?: PathParams) => void;
}


export class RouterBase implements RouterType {
    private readonly _routes: BasicMap<RouteConfig> = {};
    private _history: H.History;
    private _homeRouteId?: RouteId;

    // public methods.

    public constructor(history: H.History) {
        this._history = history;
    }

    /**
     * Initializes the router with the provided configurations.
     *
     * @param routeConfigs a list of router configurations
     * @param homeRouteId default home route id
     * @param contextPath the prefix that is going to be combined with all route paths
     */
    public initialize(homeRouteId: RouteId, routeConfigs: RouteConfig[], contextPath = ''): void {
        this._homeRouteId = homeRouteId;
        this.buildRoutesWithParentContext(routeConfigs, contextPath);
    }

    /**
     * Performs navigation to the link that is going to be built with according to the provided input parameters.
     *
     * @param routeId an id of the route to navigate to
     * @param pathParams route params, if any
     * @param queryParams query params, if any
     */
    public navigate(routeId: RouteId, pathParams?: PathParams): void {
        const config = this._routes[routeId];
        const pathname = generatePath(config.path || '');

        if (this.isNextLocationDifferent({pathname})) {
            this._history.push({pathname});
        }
    }

    /**
     * Determines whether the given location is different from the current one
     *
     * @param location a location descriptor
     * @return whether the current location is different from the given location
     */
    private isNextLocationDifferent(location: H.LocationDescriptorObject): boolean {
        const { location: oldLocation } = this._history;
        return oldLocation.pathname !== location.pathname || oldLocation.search !== location.search;
    }

    /**
     * Initializes route configuration map with all route configs
     * available in the application. If {@param parentUrl} is provided
     * then is added to beginning of each parent route.
     *
     * If route configuration has children then this function
     * is called recursively with route's full path as {@param parentUrl}.
     *
     *
     * @param routeConfigs an array of route configs
     * @param parentUrl a url part to append to all the children
     * @param parent a parent config
     */
    private buildRoutesWithParentContext(routeConfigs: RouteConfig[], parentUrl = '', parent?: RouteConfig): void {
        if (!routeConfigs || !routeConfigs.length) {
            throw new Error('Router has to be initialized with non-empty array!');
        }

        for (const config of routeConfigs) {
            const fullLink = [parentUrl, config.path].join('/');
            this._routes[config.routeId] = { ...config, parent, path: this.trimTrailingSlash(fullLink) };

            if (config.children) {
                this.buildRoutesWithParentContext(config.children, fullLink, config);
            }
        }
    }

    private trimTrailingSlash(url: string): string {
        return url.endsWith('/') && url.length > 1 ? url.substr(0, url.length - 1) : url;
    }
}

export const historyManager = H.createHashHistory({hashType: 'noslash'});
const AppRouter = new RouterBase(historyManager);
export default AppRouter;