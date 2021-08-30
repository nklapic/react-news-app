import {completed, RestAction} from '../utils';
import {Article, NewsApiResponse} from '../../common/NewsApi';
import {SearchService} from '../../views/search/SearchService';
import {QueryParams} from '../../common/rest/RestClient';

export const SEARCH_NEWS = "SEARCH_NEWS";
export const SEARCH_NEWS_COMPLETED = completed(SEARCH_NEWS);

export enum SearchSortBy {
    POPULARITY = "popularity",
    RELEVANCE = "relevance",
    PUBLISHED_AT = "publishedAt"
}

export const searchForNews = (q?: string, sortBy: SearchSortBy = SearchSortBy.PUBLISHED_AT, page: number = 1) => ({
    type: SEARCH_NEWS,
    queryParams: {
        q, sortBy, page
    },
    fetchData: (queryParams: QueryParams) => SearchService.searchNews({...queryParams, language: 'en'})
});

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

