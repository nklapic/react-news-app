import fetchClient, {QueryParams} from '../../common/rest/RestClient';
import {NewsApiResponse} from '../../common/NewsApi';

const api_key = 'c26ef5f803aa41f1a440bb0acd4d03b3';

export class HeadlinesService {

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