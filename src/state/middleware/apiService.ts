import {RootState} from '../Store';
import {Middleware} from 'redux';
import {completed, isRestAction} from '../utils';

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