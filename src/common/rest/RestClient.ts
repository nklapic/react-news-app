import {BasicMap} from '../CommonTypes';

export interface QueryParams {
    [key: string]: any;
}

export interface RestClient {
    /**
     * Triggers rest request
     */
    request<T>(requestConfig: {
        url: string;
        queryParams?: QueryParams;
        headers?: BasicMap<string>;
    }): Promise<T>;
}

export class FetchRestClient implements RestClient {

    protected static readonly CONTENT_TYPE_HEADER = 'Content-Type';

    async request<T>(requestConfig: { url: string; queryParams?: QueryParams; headers?: BasicMap<string> }): Promise<T> {
        const { url, queryParams, headers } = requestConfig;
        let path = url;
        const query = queryParams ? composeQuery(queryParams) : '';

        if (query) {
            path = path.concat(query);
        }

        return await this._handleResponse<T>(
            fetch(path, this._assembleOptions(headers)));
    }

    protected async _handleResponse<R>(task: Promise<Response>): Promise<R> {
        try {
            const response = await task;
            if (response.ok) {
                return response.json()

            } else {
                return Promise.resolve(undefined as any);
            }
        } catch (error) {
            console.log("Error during fetch!");
        }
        return Promise.resolve(undefined as any);
    }

    /**
     * Create options for Dojo xhr request.
     *
     * @param method the request method.
     * @param data body object or string to be POST'ed.
     * @param restOptions parameter to define various options.
     * @returns options for the dojo rest request.
     * @private
     */
    protected _assembleOptions(customHeaders?: BasicMap<string>): RequestInit {
        const headers = new Map<string, string>();

        if (!headers.get(FetchRestClient.CONTENT_TYPE_HEADER)) {
            headers.set(FetchRestClient.CONTENT_TYPE_HEADER, 'application/json');
        }

        // custom heraders may override globalHeaders
        if (customHeaders) {
            for (const customHeader in customHeaders) {
                if (!headers.has(customHeader)) {
                    const headerValue = customHeaders[customHeader];
                    if (headerValue) {
                        headers.set(customHeader, headerValue);
                    }
                }
            }
        }

        return {
            method: "GET",
            body: undefined,
            headers: Array.from(headers) as HeadersInit,
        } as RequestInit;
    }
}

/**
 * Create a query string from a given parameter object. The object itself is treated as a 'key values map'.
 *
 * @param queryParams an arbitrary object that should be converted to a query string.
 */
export function composeQuery(queryParams: QueryParams): string {
    const outParams: string[] = [];
    if (queryParams) {
        for (const paramName in queryParams) {
            if (Array.isArray(queryParams[paramName])) {
                queryParams[paramName].forEach((value: any) => {
                    _parseQueryParameters(outParams, paramName, value);
                });
            } else {
                _parseQueryParameters(outParams, paramName, queryParams[paramName]);
            }
        }
    }
    return outParams.length === 0 ? '' : '?' + outParams.join('&');
}

/**
 * adds query tuple from given params delimited by '=' to given array of tuples.
 * @param queryArrayParams array of query tuples
 * @param paramName parameter name for tuple, will be uriEncoded
 * @param value parameter value for tuple
 */
function _parseQueryParameters(queryArrayParams: string[], paramName: string, value: any) {
    let arrayQueryParam = encodeURIComponent(paramName);
    arrayQueryParam = arrayQueryParam.concat('=');
    arrayQueryParam = arrayQueryParam.concat(encodeURIComponent(value));
    queryArrayParams.push(arrayQueryParam);
}

const fetchClient = new FetchRestClient();
export default fetchClient;