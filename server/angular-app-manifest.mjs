
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
    'index.csr.html': {size: 13406, hash: '1f66d8305fa1328b5ab80053dd8cd2a4d206c98cd74d73f49b3db093b3005a8c', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 13336, hash: '28c7f9617ab1cd10d1c57696b91406cc8ba7fd2ccee199a76a39da74d54b9488', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 31920, hash: '8a8d7c0efed3ac6338013348f88b97591b044e2eec99da9cc303feb9c7e7bb82', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'product-explorer/index.html': {size: 31920, hash: '8a8d7c0efed3ac6338013348f88b97591b044e2eec99da9cc303feb9c7e7bb82', text: () => import('./assets-chunks/product-explorer_index_html.mjs').then(m => m.default)},
    'inactive/index.html': {size: 46134, hash: 'b77139e58432fb260b5e4175e6ce8772915c4476a5074b9840ad0021d7133484', text: () => import('./assets-chunks/inactive_index_html.mjs').then(m => m.default)},
    'styles-YFK3FYRB.css': {size: 2010, hash: 'xpbM8XVp+mE', text: () => import('./assets-chunks/styles-YFK3FYRB_css.mjs').then(m => m.default)}
  },
};
