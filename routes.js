const express = require('express');
const routes = express.Router();

const methods = require('./dataController')


routes.get('/incident/:description', methods.category_incidente)

module.exports = routes;