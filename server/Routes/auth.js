const express = require('express');
const router = express.Router();
//middlewares
const { authCheck } = require('../middlewares/auth');
//controller
const { createOrUpdateUser } = require('../Controlles/auth');

const myMiddleware = (req, res, next) => {
  console.log('i m a middleware yay');
  next();
};

router.post('/create-or-update-user', authCheck, createOrUpdateUser);

router.get('/testing', myMiddleware, (req, res) => {
  res.json({
    data: 'you successfully rried middleware',
  });
});

module.exports = router;
