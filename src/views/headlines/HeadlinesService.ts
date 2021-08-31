import fetchClient from '../../common/rest/RestClient';
import {NewsApiResponse} from '../../common/NewsApi';
import {QueryParams} from '../../common/CommonTypes';

const api_key = 'c26ef5f803aa41f1a440bb0acd4d03b3';

/**
 * Defines all service methods which are necessary to work with top-headlines api.
 */
export class HeadlinesService {

    /**
     * Sends request to NewsAPI to fetch top-headlines. Top-headlines are paged using query parameters.
     * The request also adds X-Api-Key to the headers because it is necessary to be able to authorize.
     *
     * // TODO: Think about moving api_key header to "more central" place, maybe redux-middleware.
     *
     * @param queryParams query parameters for top-headlines (usually only a page number)
     */
    public static async getHeadlines(queryParams?: QueryParams): Promise<NewsApiResponse> {
        return fetchClient.request<NewsApiResponse>({
            url: "/top-headlines",
            queryParams: queryParams || {},
            headers: {
                "X-Api-Key": api_key,
                "Access-Control-Allow-Origin": "*"
            }
        });
    }
}