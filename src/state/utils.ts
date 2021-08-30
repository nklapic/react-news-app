import {Action} from 'redux';
import {QueryParams} from '../common/rest/RestClient';

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