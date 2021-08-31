import {DateAsString} from './CommonTypes';

/**
 * The following interfaces define types and structure of data comming from NewsAPI.
 */

/**
 * Defines type for the source of article.
 * It is important to name parameters as they are named in NewsAPI, otherwise json deserialization won't work properly.
 */
export interface Source {
    id?: string;
    name?: string;
}

/**
 * Definition of article itself.
 */
export interface Article {
    author?: string;
    content: string;
    description: string;
    publishedAt: DateAsString;
    source: Source;
    title: string;
    url: string;
    urlToImage?: string;
}

/**
 * Since we get some meta data with articles, here we have a wrapper to get that data in type safe way.
 */
export interface NewsApiResponse {
    status?: string;
    totalResults?: number;
    articles?: Article[];
}