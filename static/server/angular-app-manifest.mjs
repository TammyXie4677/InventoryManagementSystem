
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
    'index.csr.html': {size: 5799, hash: '85df5968d93d566b4e01354dc892f1993517a771245a40fe933756500b690b42', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1864, hash: '3fb743fa3d294c40768ef5337cddd17d400b174df57be0ce8bd9f1f842d2142b', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 5971, hash: 'cc0ef272d66a782ab687cd1651410086334fbed66899311ca26969f69db7a3b3', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-YZ3747Z3.css': {size: 231790, hash: 'oUP/+r4jhn8', text: () => import('./assets-chunks/styles-YZ3747Z3_css.mjs').then(m => m.default)}
  },
};
