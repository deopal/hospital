const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/',
    createProxyMiddleware({
      target: 'https://your-hospital.herokuapp.com',
      changeOrigin: true,
    })
  );
};