import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './common/router/RouterType';
import {RouteIds} from './common/router/RouteIds';
import {HomeRouteConfig} from './views/headlines/HeadlinesComponent';
import App from './App';
import {SearchRouterConfig} from './views/search/SearchComponent';
import {ArticleRouteConfig} from './views/article/ArticleComponent';


const appRoutes = [HomeRouteConfig, SearchRouterConfig, ArticleRouteConfig];

/**
 * Mounts the application to root div element.
 * Initializes application router.
 */
export const mount = () => {
    AppRouter.initialize(RouteIds.home, appRoutes);
    ReactDOM.render(
        <React.StrictMode>
            <App/>
        </React.StrictMode>,
        document.getElementById('root')
    );
}

mount();