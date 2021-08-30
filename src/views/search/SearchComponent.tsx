import {RouteConfig} from '../../common/router/RouterType';
import {RouteIds} from '../../common/router/RouteIds';
import {Button, ButtonGroup, CircularProgress, InputAdornment, TextField, Typography} from '@material-ui/core';
import {SearchRounded} from '@material-ui/icons';
import {makeStyles} from '@material-ui/core/styles';
import {ChangeEvent, useCallback} from 'react';
import {connect} from 'react-redux';
import {RootState} from '../../state/Store';
import {searchForNews, SearchSortBy, SearchState} from '../../state/search/SearchReducer';
import ArticlesComponents from '../../common/components/ArticlesComponents';
import {isMorePagesAvailable} from '../../state/topheadlines/TopHeadlinesReducer';
import {setArticle} from '../../state/article/ArticleReducer';
import {Article} from '../../common/NewsApi';

const useStyles = makeStyles({
    searchContainer: {
        width: '100%'
    },

    searchInputs: {
        marginBottom: 20,
        display: 'flex',
        padding: '80px 20px 20px'
    },

    sortElement: {
        display: 'flex',
        alignItems: 'center',
        margin: '13px 0 0 20px'
    },
    searchResults: {
        display: 'flex',
        justifyContent: 'center'
    }
});

let searchTimeout: NodeJS.Timeout;

const Component = (props: {
    searchState: SearchState,
    searchForNews: (q?: string, sortBy?: SearchSortBy, page?: number ) => void,
    setArticle: (article: Article) => void
}) => {
    const classes = useStyles();
    const {searchState} = props;
    const {articles, page, q, sortBy, loading, totalResults = 0} = searchState;

    const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            props.searchForNews(e.target.value);
        }, 400);
    }, []);


    return (
        <>
            <div className={classes.searchContainer}>
                <div className={classes.searchInputs}>
                    <TextField
                        id="input-with-icon-textfield"
                        label="Search for anything"
                        disabled={loading}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    {loading ? <CircularProgress size={24}/> : <SearchRounded/>}
                                </InputAdornment>
                            ),
                        }}
                    />
                    {
                        articles?.length ?
                            <div className={classes.sortElement}>
                                <Typography>Sort by</Typography>
                                <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
                                    <Button
                                        onClick={() => props.searchForNews(q, SearchSortBy.RELEVANCE)}>Relevance</Button>
                                    <Button
                                        onClick={() => props.searchForNews(q, SearchSortBy.POPULARITY)}>Popularity</Button>
                                    <Button onClick={() => props.searchForNews(q, SearchSortBy.PUBLISHED_AT)}>Published
                                        date</Button>
                                </ButtonGroup>
                            </div> : null
                    }
                </div>
                <div className={classes.searchResults}>
                    <ArticlesComponents
                        articles={articles || []}
                        navigateToArticle={props.setArticle}
                        loadMore={() => props.searchForNews(q, sortBy, page + 1)}
                        loadMoreDisabled={!isMorePagesAvailable(totalResults || 0, articles?.length || 0,)}
                    />
                </div>
            </div>
        </>
    )
}

export const SearchRouterConfig : RouteConfig = {
    routeId: RouteIds.search,
    path: "/search"
}

const mapStateToProps = (state: RootState) => ({
    searchState: state.searchState
});

const mapDispatchToProps = {
    searchForNews,
    setArticle
}

const SearchComponent = connect(mapStateToProps, mapDispatchToProps)(Component);

export default SearchComponent;