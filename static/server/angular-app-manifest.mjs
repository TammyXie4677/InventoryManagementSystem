
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
    'index.csr.html': {size: 5538, hash: '82f78de8a0f4064d69b44f93636a54232f00b0148f8d6fae02d2e4ee831d4981', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1637, hash: 'fff856f34dc95fa34dff85aeccb089809a08e0c5edeb4fafa7146ac7dc48c211', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 7671, hash: '11d0ecb4a3efd148bc675c5e111363dc3a39225b23a394017791333ccf59d56d', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-H4EXOXPV.css': {size: 231768, hash: 'dzbh9X4wu8c', text: () => import('./assets-chunks/styles-H4EXOXPV_css.mjs').then(m => m.default)}
  },
};
