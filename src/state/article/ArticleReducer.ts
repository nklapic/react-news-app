import {Article} from '../../common/NewsApi';
import {AnyAction} from 'redux';
import AppRouter from '../../common/router/RouterType';
import {RouteIds} from '../../common/router/RouteIds';

export const SET_ARTICLE = "SET_ARTICLE";

export const setArticle = (article: Article) => ({
    type: SET_ARTICLE,
    article,
});

const articleReducer = (state: Article | null = null, action: AnyAction) => {
    switch (action.type) {
        case SET_ARTICLE:
            // FIXME: The router call is a hack!
            //  Usually I would sent path parameters to router (article id), initialize the component from it
            //  and send a fetch request to the api to get details of an article, but the NewsApi doesn't provide such thing.
            AppRouter.navigate(RouteIds.article);
            return action['article'];
        default:
            return state;
    }
}


export default articleReducer;

