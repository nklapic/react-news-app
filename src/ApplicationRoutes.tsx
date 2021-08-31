import {Route, Router} from 'react-router';
import {historyManager} from './common/router/RouterType';
import HeadlinesComponent, {HomeRouteConfig} from './views/headlines/HeadlinesComponent';
import {Provider} from 'react-redux';
import store from './state/Store';
import SearchComponent, {SearchRouterConfig} from './views/search/SearchComponent';
import ArticleComponent, {ArticleRouteConfig} from './views/article/ArticleComponent';

/**
 * Renders react-router and prepares all applications routes. Redux store provider is also initialized here,
 * as it is need by react-redux library.
 *
 * @constructor
 */
export const ApplicationRoutes = () => {
    return (
        <>
            <Provider store={store} >
                <Router history={historyManager}>
                    <Route component={HeadlinesComponent} path={HomeRouteConfig.path} exact={true}/>
                    <Route component={SearchComponent} path={SearchRouterConfig.path} exact={true}/>
                    <Route component={ArticleComponent} path={ArticleRouteConfig.path} exact={true}/>
                </Router>
            </Provider>
        </>
    )
}