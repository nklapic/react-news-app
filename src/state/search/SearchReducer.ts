import {completed, RestAction} from '../utils';
import {Article, NewsApiResponse} from '../../common/NewsApi';
import {SearchService} from '../../views/search/SearchService';
import {QueryParams} from '../../common/CommonTypes';

export const SEARCH_NEWS = "SEARCH_NEWS";
export const SEARCH_NEWS_COMPLETED = completed(SEARCH_NEWS);

/**
 * Defines values which can be used to sort search items.
 */
export enum SearchSortBy {
    POPULARITY = "popularity",
    RELEVANCE = "relevance",
    PUBLISHED_AT = "publishedAt"
}

/**
 * Dispatches an action which triggers search request to the NewsAPI.
 *
 * @param q query string
 * @param sortBy sorting criteria
 * @param page number of page to fetch
 */
export const searchForNews = (q?: string, sortBy: SearchSortBy = SearchSortBy.PUBLISHED_AT, page: number = 1) => ({
    type: SEARCH_NEWS,
    queryParams: {
        q, sortBy, page
    },
    fetchData: (queryParams: QueryParams) => SearchService.searchNews({...queryParams, language: 'en'})
});

/**
 * The search view state. Since there is a "bit" more complex logic
 * (It is required store query string for sorting request, and to keep input field blocked while search is ongoing),
 * this state defines a bit more meta data along with articles.
 */
export interface SearchState {
    articles?: Article[],
    page: number;
    totalResults?: number;
    sortBy?: SearchSortBy,
    q?: string,
    loading: boolean
}

const searchReducer = (state: SearchState = {articles: [], loading: false, page: 1}, action: RestAction<NewsApiResponse>): SearchState => {
    switch (action.type) {
        case SEARCH_NEWS:
            return {...state, loading: true};
        case SEARCH_NEWS_COMPLETED:
            const newQueryString = action.queryParams?.['q'];
            const newSorting = action.queryParams?.['sortBy'];
            const isNewSearchTriggered = state.q !== newQueryString || state.sortBy !== newSorting;
            const articles = isNewSearchTriggered ? action.payload?.articles : state.articles?.concat(action.payload?.articles || []);
            return {
                ...state,
                totalResults: action.payload?.totalResults,
                articles,
                loading: false,
                sortBy: newSorting,
                q: newQueryString
            };
        default:
            return state;
    }
}


export default searchReducer;

