
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: './',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  }
],
  assets: {
    'index.csr.html': {size: 434, hash: '07657286aa5d7c87feb4b7da73a82317dc1132ffc8c8a055ae9fcbc31a713b92', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 947, hash: '40a400dbcd2f9b791b237585d8c3a8b6fc38afcaa01f63322ee3db1135c91da0', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 677, hash: '9c1a766ec1605c31a758b6a8f6be778a13ebd10be7008b2c39b2ad3a1db0cc5e', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-5INURTSO.css': {size: 0, hash: 'menYUTfbRu8', text: () => import('./assets-chunks/styles-5INURTSO_css.mjs').then(m => m.default)}
  },
};
