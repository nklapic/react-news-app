/**
 * Type of object which holds path parameters. No proper definition in React router, this was embedded in the
 * {@link generatePath} function definition.
 */
export interface PathParams {
    [key: string]: string | number | boolean;
}

/**
 * A basic map, where indexes are strings.
 */
export interface BasicMap<T> {
    [index: string]: T;
}

export type DateAsString = string;