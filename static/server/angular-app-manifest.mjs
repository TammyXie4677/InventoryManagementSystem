
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
    'index.csr.html': {size: 5538, hash: '021e8f1454aebdb978f0aa520ec703d757805d35c7f7b2ac94875d8c0b4cb1f9', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1637, hash: 'e7115c6ed54afb0b44d095a7a06175be67bcec7c8c1068c21764587196042e17', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 7671, hash: '18ccf06f793f6a10d38fec03bd87020253f248cbba14e726f5364d002432b369', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-H4EXOXPV.css': {size: 231768, hash: 'dzbh9X4wu8c', text: () => import('./assets-chunks/styles-H4EXOXPV_css.mjs').then(m => m.default)}
  },
};
