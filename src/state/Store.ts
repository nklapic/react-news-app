import {applyMiddleware, combineReducers, createStore} from 'redux';
import topHeadlinesReducer from './topheadlines/TopHeadlinesReducer';
import {apiServiceMiddleware} from './middleware/apiService';
import searchReducer from './search/SearchReducer';
import articleReducer from './article/ArticleReducer';

const reducer = combineReducers({
    topHeadlines: topHeadlinesReducer,
    searchState: searchReducer,
    article: articleReducer
})

const store = createStore(reducer, applyMiddleware(apiServiceMiddleware));
export default store;
export type RootState = ReturnType<typeof reducer>;