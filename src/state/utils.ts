import {Action} from 'redux';
import {QueryParams} from '../common/CommonTypes';

export const completed = (action: string ) => {
    return action + "_COMPLETED";
}

export interface RestAction<T> extends Action<string> {
    payload?: T,
    queryParams?: QueryParams,
    fetchData?: (queryParams: QueryParams) => Promise<T>
}

export function isRestAction(object: any): object is RestAction<any> {
    return 'fetchData' in object;
}

const PAGE_SIZE = 20;

/**
 * Determines page number by dividing number of so far loaded articles with page size.
 * Page size is by default 20 there is not configuration to change it.
 *
 * @param numberOfItems number of loaded articles
 */
export const determinePageNumber = (numberOfItems: number): number => {
    return numberOfItems / PAGE_SIZE;
}

/**
 * Checks if there are more pages to be loaded from the api. The implementation will determine
 * current page and compare it with total number of pages. If current page is smaller than total number of pages
 * then there are more pages to be loaded.
 *
 * @param totalResults total number of articles available
 * @param numberOfItems
 */
export const isMorePagesAvailable = (totalResults: number, numberOfItems: number) => {
    return determinePageNumber(numberOfItems) < determinePageNumber(totalResults);
}