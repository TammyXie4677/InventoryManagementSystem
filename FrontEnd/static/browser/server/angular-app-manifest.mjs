
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
    'index.csr.html': {size: 5538, hash: 'dee7d225c22fd5f8a9c859b016057abe27b282a1da8d806a6d8175b743570f61', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1637, hash: '03fd4b6c6d7b5674137464ed65cd0e30fb7cd8d6c37dd528b65e0d12f63794f6', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 7671, hash: '6d22780cdd14d45f1ef048925d2d4b53acd55ffd98802f8bcee74ad511847400', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-H4EXOXPV.css': {size: 231768, hash: 'dzbh9X4wu8c', text: () => import('./assets-chunks/styles-H4EXOXPV_css.mjs').then(m => m.default)}
  },
};
