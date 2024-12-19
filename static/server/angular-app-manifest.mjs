
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
    'index.csr.html': {size: 6909, hash: '71acd67df821e4d067d92ed1f4ef47cda1e592091b40b6d55e6ca1661a0cc874', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 2743, hash: '17ca9c6f231c0e4b0d2771d5e053f7b8af41b1481975c4d291f4afdd1d4920f5', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 7080, hash: '59cfb5671169de2172760b48d384deaeda5e161565fcb0fbdaa93abcdce26c01', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-H4EXOXPV.css': {size: 231768, hash: 'dzbh9X4wu8c', text: () => import('./assets-chunks/styles-H4EXOXPV_css.mjs').then(m => m.default)}
  },
};
