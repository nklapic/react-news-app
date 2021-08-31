import {RootState} from '../Store';
import {Middleware} from 'redux';
import {completed, isRestAction} from '../utils';

/**
 * Defines redux store middleware for the backend calls.
 *
 * DESIGN DECISION: The backend calls are not to be implemented in the components, but in the redux-middleware.
 * Responsibility of client requesting data is to dispatch {@link RestAction} with fetchData method provided.
 * FetchData method is calling backend service, but it is middleware's responsibility to actually trigger the request.
 * Once request is completed, a "completed" action is dispatched with payload as metadata of the action.
 * Effectively, reducers should handle "completed" action types. Next state of the store is contained in payload of
 * received action.
 *
 * @param storeApi
 */
export const apiServiceMiddleware: Middleware<{}, RootState> = storeApi => next => action => {
    const result = next(action);
    if (isRestAction(action) && action.fetchData) {
        action.fetchData(action.queryParams || {}).then((result) => {
            next({
                queryParams: action.queryParams,
                type: completed(action.type),
                payload: result
            })
        });
    } else {
        return result;
    }
}