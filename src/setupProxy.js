const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "https://jsonplaceholder.typicode.com/posts/1/comments",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "/",
      },
    })
  );
};
