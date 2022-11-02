const express = require('express');
const router = express.Router();
//middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');
//controller
const { create, listAll } = require('../Controlles/product');

router.post('/product', authCheck, adminCheck, create);
router.get('/products/:count', listAll);

module.exports = router;
