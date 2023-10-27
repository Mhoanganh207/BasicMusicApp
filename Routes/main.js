const express = require('express');
const router = express.Router();

const mainController = require('../Controller/MainController');


router.get('/', mainController.index);

module.exports = router;