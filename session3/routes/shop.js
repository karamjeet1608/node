const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

const adminData = require('./admin');

router.get('/', (req, res, next) => {
  //console.log('shopjs', adminData.products);
  //res.sendFile(path.join(rootDir, 'views', 'shop.html'));
  const products = adminData.products;
  //res.render('shop', {prods: products, docTitle: 'Shop', path: '/'});
  res.render('shop', {
    prods: products,
    pageTitle: 'Shop',
    path: '/',
    hasProducts: products.length > 0,
    activeShop: true,
    productCSS: true
  });

});

module.exports = router;
