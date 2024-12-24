
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
    'index.csr.html': {size: 13486, hash: '2809b0d0961b4c910150e70c6eb1e2a7b4f2c46d2b07493a65da5134f9cdc470', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 13271, hash: '75545daa1116baac9724e3af0f496a2e514da4c18e1b12009e684cb9720c8028', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'product-explorer/index.html': {size: 31943, hash: '0b6184789ea37a8b700d6f0e577537f535505731ca326c99c0314c502bd0c2db', text: () => import('./assets-chunks/product-explorer_index_html.mjs').then(m => m.default)},
    'inactive/index.html': {size: 47740, hash: 'f0249ebc23e3646e128852ed6337374264b3f1c85a8e1cca6bd1da1a90e2def7', text: () => import('./assets-chunks/inactive_index_html.mjs').then(m => m.default)},
    'index.html': {size: 31943, hash: '0b6184789ea37a8b700d6f0e577537f535505731ca326c99c0314c502bd0c2db', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-DBGNEXP5.css': {size: 351909, hash: 'myNinD1PG4A', text: () => import('./assets-chunks/styles-DBGNEXP5_css.mjs').then(m => m.default)}
  },
};
