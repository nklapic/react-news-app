import * as H from 'history'
import {BasicMap} from '../CommonTypes';
import {generatePath} from 'react-router';

export type RouteId = string;

/**
 * Configuration of routes.
 */
export interface RouteConfig {
    routeId: RouteId;
    path: string;
}

export interface RouterType {
    initialize: (homeRouteId: RouteId, routeConfigs: RouteConfig[]) => void;
    navigate: (routeId: RouteId) => void;
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
     */
    public initialize(homeRouteId: RouteId, routeConfigs: RouteConfig[]): void {
        this._homeRouteId = homeRouteId;
        this.buildCorrectPaths(routeConfigs);
    }

    /**
     * Performs navigation to the link that is going to be built with according to the provided input parameters.
     *
     * @param routeId an id of the route to navigate to
     */
    public navigate(routeId: RouteId): void {
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
     * Initializes route configuration map with all route configs available in the application.
     *
     * @param routeConfigs an array of route configs
     */
    private buildCorrectPaths(routeConfigs: RouteConfig[]): void {
        if (!routeConfigs || !routeConfigs.length) {
            throw new Error('Router has to be initialized with non-empty array!');
        }

        for (const config of routeConfigs) {
            this._routes[config.routeId] = { ...config};
        }
    }
}

export const historyManager = H.createHashHistory({hashType: 'noslash'});
const AppRouter = new RouterBase(historyManager);
export default AppRouter;