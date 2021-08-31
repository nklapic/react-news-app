import {completed, determinePageNumber, RestAction} from '../utils';
import {Article, NewsApiResponse} from '../../common/NewsApi';
import {HeadlinesService} from '../../views/headlines/HeadlinesService';
import {QueryParams} from '../../common/CommonTypes';

export const FETCH_TOP_HEADLINES = "FETCH_TOP_HEADLINES";
export const FETCH_TOP_HEADLINES_COMPLETED = completed(FETCH_TOP_HEADLINES);


/**
 * Dispatches action for fetching of headlines.
 *
 * @param page number of page to fetch
 */
export const fetchTopHeadlines = (page: number) => ({
    type: FETCH_TOP_HEADLINES,
    queryParams: {page},
    fetchData: (queryParams: QueryParams) => HeadlinesService.getHeadlines({...queryParams, language: 'en'})
});

export interface TopHeadlinesState {
    articles?: Article[],
    totalItems?: number;
    page: number;
}

const topHeadlinesReducer = (state: TopHeadlinesState = {page: 0, articles: []}, action: RestAction<NewsApiResponse>) => {
    switch (action.type) {
        case FETCH_TOP_HEADLINES_COMPLETED:
            const newArticlesArray = state.articles?.concat(action.payload?.articles || []);
            return {
                ...state,
                articles: newArticlesArray,
                page: determinePageNumber(newArticlesArray?.length || 0),
                totalItems: action.payload?.totalResults
            };
        default:
            return state;
    }
}


export default topHeadlinesReducer;

