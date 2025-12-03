const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 10000;

app.use('/', createProxyMiddleware({
  target: 'https://777.com',
  changeOrigin: true,
  ws: true,
  followRedirects: true,
  onProxyReq: (proxyReq, req, res) => {
    proxyReq.setHeader('Host', 'claude.ai');
    proxyReq.setHeader('Origin', 'https://claude.ai');
    proxyReq.setHeader('Referer', 'https://claude.ai/');
  },
  onProxyRes: (proxyRes, req, res) => {
    delete proxyRes.headers['content-security-policy'];
    delete proxyRes.headers['x-frame-options'];
  }
}));

app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
