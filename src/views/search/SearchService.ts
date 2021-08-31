import fetchClient from '../../common/rest/RestClient';
import {NewsApiResponse} from '../../common/NewsApi';
import {QueryParams} from '../../common/CommonTypes';

const api_key = 'c26ef5f803aa41f1a440bb0acd4d03b3';

/**
 * Defines request methods for communication with "everything" part of the NewsAPI.
 */
export class SearchService {
    /**
     * Sends a request for searching and sorting of articles.
     * The request also adds X-Api-Key to the headers because it is necessary to be able to authorize.
     *
     * // TODO: Think about moving api_key header to "more central" place, maybe redux-middleware.
     *
     * @param queryParams - query string, sort criteria and/or page number
     */
    public static async searchNews(queryParams?: QueryParams): Promise<NewsApiResponse> {
        return fetchClient.request<NewsApiResponse>({
            url: "/everything",
            queryParams: queryParams || {},
            headers: {
                "X-Api-Key": api_key,
                "Access-Control-Allow-Origin": "*"
            }
        });
    }
}