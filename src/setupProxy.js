const {createProxyMiddleware} = require('http-proxy-middleware');

/***
 * Definition of the proxy to the NewsAPI.
 * This enable usage of API without hostname (in services) and takes care of the CORS policy.
 *
 * @param app
 */
module.exports = function(app) {
    app.use(
        '/top-headlines',
        createProxyMiddleware({
            target: 'https://newsapi.org/v2',
            changeOrigin: true,
        })
    );

    app.use(
        '/everything',
        createProxyMiddleware({
            target: 'https://newsapi.org/v2',
            changeOrigin: true,
        })
    );
};