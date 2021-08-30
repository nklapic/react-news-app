import {RouteConfig} from '../../common/router/RouterType';
import {RouteIds} from '../../common/router/RouteIds';
import {connect} from 'react-redux';
import {RootState} from '../../state/Store';
import {fetchTopHeadlines, isMorePagesAvailable, TopHeadlinesState} from '../../state/topheadlines/TopHeadlinesReducer';
import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ArticlesComponents from '../../common/components/ArticlesComponents';
import {setArticle} from '../../state/article/ArticleReducer';
import {Article} from '../../common/NewsApi';

const useStyles = makeStyles(() => ({
    container: {
        marginTop: 90,
        margin: '0 auto',
    },
    load: {
        display: 'flex',
        margin: '20px auto'
    },
}));

const Component = (props: {
    headlineState: TopHeadlinesState,
    fetchTopHeadlines: (page: number) => void,
    setArticle: (article: Article) => void;
}) => {
    const classes = useStyles();

    const {headlineState: {articles, totalItems, page = 0} = {}} = props;

    useEffect(() => {
        props.fetchTopHeadlines(0);
    }, []);

    return (
        <div className={classes.container}>
            <ArticlesComponents
                articles={articles || []}
                navigateToArticle={props.setArticle}
                loadMore={() => props.fetchTopHeadlines(page + 1)}
                loadMoreDisabled={!isMorePagesAvailable(totalItems || 0, articles?.length || 0, )}
            />

        </div>
    )
}

export const HomeRouteConfig: RouteConfig = {
    routeId: RouteIds.home,
    path: '/'
}

const mapStateToProps = (state: RootState) => ({
    headlineState: state.topHeadlines
})

const mapDispatchToProps = {
    fetchTopHeadlines,
    setArticle
}

const TopNewsComponent = connect(mapStateToProps, mapDispatchToProps)(Component);
export default TopNewsComponent;