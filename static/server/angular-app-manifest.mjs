
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
    'index.csr.html': {size: 7005, hash: 'a44e6c7410c7ce4477aee59a3e909bfeaeb2db110d0dd027b2a2d912c7ad7349', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 2839, hash: 'f4fe0e8e85142c241009c82addd10ad2bba730b743a2ad7df097509e60545f6d', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 7176, hash: '947626d3ba8501fa8f675fc82496a38a02840ae18ed7abf82751c7d6ac2462ed', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-H4EXOXPV.css': {size: 231768, hash: 'dzbh9X4wu8c', text: () => import('./assets-chunks/styles-H4EXOXPV_css.mjs').then(m => m.default)}
  },
};
