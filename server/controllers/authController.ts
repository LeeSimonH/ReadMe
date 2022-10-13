const authController = {};

require('dotenv').config();
const CLIENT_ID: string = process.env.CLIENT_ID;
const CLIENT_SECRET: string = process.env.CLIENT_SECRET;
const REDIRECT_URI: string = process.env.REDIRECT_URI;

module.exports = authController;