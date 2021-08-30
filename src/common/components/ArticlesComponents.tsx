import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import {formatPublishedDate} from '../DateFormatter';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import {Article} from '../NewsApi';
import {makeStyles} from '@material-ui/core/styles';
import {red} from '@material-ui/core/colors';
import {Button, CardActions} from '@material-ui/core';

const useStyles = makeStyles(() => ({
    container: {
        maxWidth: 1830,
    },
    gridRow: {
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'flex-start'
    },
    gridItem: {
        maxWidth: 345,
        margin: 10,
        flexBasis: '20%',
        position: 'relative',
        padding: 10,
        boxSizing: "border-box",
    },
    load: {
        display: 'flex',
        margin: '20px auto'
    },
    media: {
        height: 0,
        paddingTop: '56.25%',
        backgroundSize: '300px 200px'
    },
    avatar: {
        backgroundColor: red[500],
    },

    cardActions: {
        padding: '8px',
        position: 'absolute',
        bottom: 0,
        right: 0
    }

}));

const ArticlesComponents = (props: {
    articles: Article[],
    loadMoreDisabled: boolean,
    loadMore: () => void,
    navigateToArticle: (article: Article) => void
}) => {
    const classes = useStyles();
    return (
        <>
            <div className={classes.container}>
                <div className={classes.gridRow}>
                    {
                        props.articles ?
                            props.articles.map((article) =>
                                <Card className={classes.gridItem}>
                                    <CardHeader
                                        avatar={
                                            <Avatar aria-label="recipe" className={classes.avatar}>
                                                {article.author?.substr(0, 2)}
                                            </Avatar>
                                        }
                                        title={article.title}
                                        subheader={formatPublishedDate(article.publishedAt)}
                                    />
                                    <CardMedia
                                        className={classes.media}
                                        image={article.urlToImage || 'https://cdn.iconscout.com/icon/premium/png-512-thumb/not-available-2003515-1688294.png'}
                                    />
                                    <CardContent>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {article.description}
                                        </Typography>
                                    </CardContent>
                                    <CardActions className={classes.cardActions}>
                                        <Button onClick={() => props.navigateToArticle(article) }>Read more</Button>
                                    </CardActions>

                                </Card>
                            ) : null
                    }
                    {
                     props.articles.length ?
                         <Button
                             className={classes.load}
                             variant="contained"
                             onClick={props.loadMore}
                             disabled={props.loadMoreDisabled}
                         >
                             Load more
                         </Button> : null
                    }
                </div>
            </div>
        </>
    );
}

export default ArticlesComponents;