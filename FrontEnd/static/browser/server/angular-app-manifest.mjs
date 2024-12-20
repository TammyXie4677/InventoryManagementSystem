
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
    'index.csr.html': {size: 6026, hash: '7653c5febdc45a1c36ef42bee15fff1f9b5da6762d15f9c27d2f6c4b7dafafd3', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 2125, hash: '8ea7b9ec05b64c97d80aa55985ea3b79d207eeb26557fd4d5db7aea04f9c44f8', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 7501, hash: 'd7c5a5912d21d67cdc50041692a25312cf7197d03e7f097848e6fbdcad983c43', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-H4EXOXPV.css': {size: 231768, hash: 'dzbh9X4wu8c', text: () => import('./assets-chunks/styles-H4EXOXPV_css.mjs').then(m => m.default)}
  },
};
