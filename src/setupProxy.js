const {createProxyMiddleware} = require('http-proxy-middleware');

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