import {Article} from '../../common/NewsApi';
import AppRouter, {RouteConfig} from '../../common/router/RouterType';
import {RouteIds} from '../../common/router/RouteIds';
import {RootState} from '../../state/Store';
import {connect} from 'react-redux';
import {makeStyles} from '@material-ui/core/styles';
import {Avatar, Typography} from '@material-ui/core';
import {grey, red} from '@material-ui/core/colors';
import {formatPublishedDate} from '../../common/DateFormatter';
import Image from 'material-ui-image';
import {CopyrightRounded} from '@material-ui/icons';

const useStyles = makeStyles({
    container: {
        marginTop: 80,
        padding: 20
    },

    header: {
        display: 'flex'
    },

    avatar: {
        backgroundColor: red['500'],
        marginRight: 20
    },

    description: {
        color: grey['500'],
        marginTop: 20
    },

    image: {
        maxWidth: 750,
        margin: '20px 0'
    },
    copyright: {
        display: 'flex',
        alignItems: 'center',
        color: grey['500'],
        fontSize: 10,
        paddingTop: 10
    }
})

/**
 * A component that renders content of an article.
 * Since we can't distinguish between articles by their id, we don't a nice way of initializing the fetch request
 * from the component itself. It can happen that article to show is not in the store, which leads to an error.
 * With that reason if article to be shown is not defined, a redirect is made to homepage.
 *
 * @param props
 * @constructor
 */
export const ArticleBaseComponent = (props: {article: Article}) => {

    const {article} = props;
    const classes = useStyles();

    if (!article) {
        AppRouter.navigate(RouteIds.home);
        return null;
    }

    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <Avatar className={classes.avatar}>
                    {article.author?.substr(0, 1)}
                </Avatar>
                <div >
                    <Typography variant="h5"> {article.title}</Typography>
                    <div>
                        {formatPublishedDate(article.publishedAt)}; {article.author}
                    </div>
                </div>
            </div>
            <Typography variant={"subtitle1"} className={classes.description}>
                {article.description}
            </Typography>

            <div className={classes.image}>
                <Image
                    src={article.urlToImage || 'https://cdn.iconscout.com/icon/premium/png-512-thumb/not-available-2003515-1688294.png'}
                    aspectRatio={1.89}
                />
            </div>

            <Typography variant={'body1'}>
                {article.content}
            </Typography>

            <div className={classes.copyright}>
                <CopyrightRounded/>
                <Typography variant={'h6'}>
                    {article.source ? article.source.name : "Unknown source!"}
                </Typography>
            </div>
        </div>
    )

}

export const ArticleRouteConfig: RouteConfig = {
    routeId: RouteIds.article,
    path: "/article"
}

const mapStateToProps = (state: RootState) => ({
    article: state.article
})

const ArticleComponent = connect(mapStateToProps, {})(ArticleBaseComponent);
export default ArticleComponent;