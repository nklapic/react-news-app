import {Route, Router} from 'react-router';
import {historyManager} from './common/router/RouterType';
import TopNewsComponent, {HomeRouteConfig} from './views/headlines/TopNewsComponent';
import {Provider} from 'react-redux';
import store from './state/Store';
import SearchComponent, {SearchRouterConfig} from './views/search/SearchComponent';
import ArticleComponent, {ArticleRouteConfig} from './views/article/ArticleComponent';

export const ApplicationRoutes = () => {
    return (
        <>
            <Provider store={store} >
                <Router history={historyManager}>
                    <Route component={TopNewsComponent} path={HomeRouteConfig.path} exact={true}/>
                    <Route component={SearchComponent} path={SearchRouterConfig.path} exact={true}/>
                    <Route component={ArticleComponent} path={ArticleRouteConfig.path} exact={true}/>
                </Router>
            </Provider>
        </>
    )
}