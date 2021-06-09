const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://your-hospital.herokuapp.com',
      changeOrigin: true,
    })
  );
};