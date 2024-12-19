
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
    'index.csr.html': {size: 5538, hash: '189555d6183566084591b53e05dc6d8419aa9195bef45f2d1352a3198889f325', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1637, hash: '6e2e61f23fa507ab38c12345021d9dc063baed538585b1f39ede494385270a20', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 6999, hash: '5c0787193b9ac039fbd1181a4f6890b10c05acb752f9a7f01c7d1020961724c9', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-H4EXOXPV.css': {size: 231768, hash: 'dzbh9X4wu8c', text: () => import('./assets-chunks/styles-H4EXOXPV_css.mjs').then(m => m.default)}
  },
};
