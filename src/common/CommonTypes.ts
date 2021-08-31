/**
 * A basic map for query parameters. Query parameter is a key value pair.
 * Key is of type string, but value can be number, string, boolean, array or whatever.
 */
export interface QueryParams {
    [key: string]: any;
}

/**
 * A basic map, where indexes are strings.
 */
export interface BasicMap<T> {
    [index: string]: T;
}

export type DateAsString = string;