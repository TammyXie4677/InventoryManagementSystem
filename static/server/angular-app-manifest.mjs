
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
    'index.csr.html': {size: 6801, hash: '7a2caa41e49fde59539b0b68c0fbef6d3de10fbe8faa5fbf3af1dd0e5c9ae31d', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 2691, hash: '57dc2999bc52bd991fae2c5a4609daec8acd4d8b709e7dfc69f112d19389a37b', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 6972, hash: '76e8cfd5dc10dccce962eb4d9c7037237d9d26770a77e4b5d3292e6dd093429e', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-H4EXOXPV.css': {size: 231768, hash: 'dzbh9X4wu8c', text: () => import('./assets-chunks/styles-H4EXOXPV_css.mjs').then(m => m.default)}
  },
};
