
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/product-explorer"
  },
  {
    "renderMode": 2,
    "route": "/inactive"
  },
  {
    "renderMode": 2,
    "redirectTo": "/inactive",
    "route": "/**"
  }
],
  assets: {
    'index.csr.html': {size: 13406, hash: '06e2c71550769c4d1f670d2f84b28639a115c29172538bb79c5f35111a8e5537', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 13336, hash: '5ed6515dcc4f6f418d166f718bc66ddf2702d3d44025220991f61a1c5e5c4a1f', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 31920, hash: '6d1668acb5589e840cb1938d7b929951bab2da5fb4fe7568cf96a81ded070d1f', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'inactive/index.html': {size: 46134, hash: '9bdf270c057dbef817092ea05076b687443cde92b78d9d5b53581c34298ed447', text: () => import('./assets-chunks/inactive_index_html.mjs').then(m => m.default)},
    'product-explorer/index.html': {size: 31920, hash: '6d1668acb5589e840cb1938d7b929951bab2da5fb4fe7568cf96a81ded070d1f', text: () => import('./assets-chunks/product-explorer_index_html.mjs').then(m => m.default)},
    'styles-YFK3FYRB.css': {size: 2010, hash: 'xpbM8XVp+mE', text: () => import('./assets-chunks/styles-YFK3FYRB_css.mjs').then(m => m.default)}
  },
};
