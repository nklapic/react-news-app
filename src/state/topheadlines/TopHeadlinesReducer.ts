import {completed, RestAction} from '../utils';
import {Article, NewsApiResponse} from '../../common/NewsApi';
import {Action} from 'redux';
import {HeadlinesService} from '../../views/headlines/HeadlinesService';
import {Query} from '@testing-library/react';
import {QueryParams} from '../../common/rest/RestClient';

export const FETCH_TOP_HEADLINES = "FETCH_TOP_HEADLINES";
export const FETCH_TOP_HEADLINES_COMPLETED = completed(FETCH_TOP_HEADLINES);

const PAGE_SIZE = 20;

export const determinePageNumber = (numberOfItems: number): number => {
    return numberOfItems / PAGE_SIZE;
}

export const isMorePagesAvailable = (totalResults: number, numberOfItems: number) => {
    return determinePageNumber(numberOfItems) < determinePageNumber(totalResults);
}

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
            return {...state, articles: newArticlesArray, page: determinePageNumber(newArticlesArray?.length || 0)};
        default:
            return state;
    }
}


export default topHeadlinesReducer;

