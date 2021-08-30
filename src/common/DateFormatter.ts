import moment from 'moment'
import {DateAsString} from './CommonTypes';

const DEFAULT_DATE_FORMAT = "DD.MM.YYYY HH:mm"

export function formatPublishedDate(date: DateAsString) {
    return moment(date).format(DEFAULT_DATE_FORMAT);
}