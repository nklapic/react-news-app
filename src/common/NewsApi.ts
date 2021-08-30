import {DateAsString} from './CommonTypes';

export interface Source {
    id?: number;
    name?: string;
}

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

export interface NewsApiResponse {
    status?: string;
    totalResults?: number;
    articles?: Article[];
}