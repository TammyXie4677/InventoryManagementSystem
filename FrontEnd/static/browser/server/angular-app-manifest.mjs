
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
    'index.csr.html': {size: 5538, hash: 'f30305db07ff8829a77ebcb7ff2f4513e855720878d5608dc64b76c7f9a02159', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1637, hash: '90078d18bfc39ade01b8e22d3204bb716432a83e4c7c6429fedd12fb1255f5f7', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 7013, hash: 'd61478200fac0658f4848575745e387b5361b7bfc7720d922a3cd6ee3ca83ab3', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-H4EXOXPV.css': {size: 231768, hash: 'dzbh9X4wu8c', text: () => import('./assets-chunks/styles-H4EXOXPV_css.mjs').then(m => m.default)}
  },
};
