const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static homepage
app.use(express.static('static'));

// Proxy middleware: forward requests starting with /proxy
app.use('/proxy', (req, res, next) => {
  const target = req.query.url;
  if (!target) return res.status(400).send('Missing url query parameter');

  // Proxy the target URL, rewrite path to '/'
  createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: {'^/proxy': ''},
    onError: (err, req, res) => {
      res.status(500).send('Proxy error: ' + err.message);
    }
  })(req, res, next);
});

// Start server
app.listen(PORT, () => {
  console.log(`Minimal proxy running on port ${PORT}`);
});

