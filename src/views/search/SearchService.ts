import fetchClient, {QueryParams} from '../../common/rest/RestClient';
import {NewsApiResponse} from '../../common/NewsApi';

const api_key = 'c26ef5f803aa41f1a440bb0acd4d03b3';

export class SearchService {

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