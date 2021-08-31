import moment from 'moment'
import {DateAsString} from './CommonTypes';

const DEFAULT_DATE_FORMAT = "DD.MM.YYYY HH:mm"

/**
 * Formats publishedAt date string provided by NewsAPI into "more" readable string.
 * @param date date as string
 */
export function formatPublishedDate(date: DateAsString) {
    return moment(date).format(DEFAULT_DATE_FORMAT);
}