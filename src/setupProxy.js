const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    // '', baeURL
    createProxyMiddleware({
      target: 'http://localhost:4000', // 你的後端伺服器地址
      // target: 'http://dummy.zeabur.app',
      changeOrigin: true, // 確保跨域請求的來源正確
      // pathRewrite: {
      //   '^/api': '',
      // },
      // pathRewrite: function (path, req) {
      //   console.log(path);
      //   console.log(req);
      //   return path;
      // },
      pathFilter: '/api',
    })
  );
};

// browser 打 3000 -> server 3000 [proxy] ->  api server 4000
