const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Proxy any requests that start with /proxy to the target URL
app.use('/proxy', createProxyMiddleware({
  target: '', // target will be dynamic based on query
  changeOrigin: true,
  router: function(req) {
    // Get the 'url' query parameter and use that as the target
    const targetUrl = req.query.url;
    return targetUrl;
  }
}));

// Listen on the port Railway provides or default to 3000 locally
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
