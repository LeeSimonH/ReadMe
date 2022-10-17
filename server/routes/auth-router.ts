const express = require('express');
const authRouter = express.Router();

const authController = require('../controllers/authController');

module.exports = authRouter;