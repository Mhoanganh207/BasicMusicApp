const express = require('express');
const router = express.Router();


const searchController = require('../Controller/SearchController');


router.get('/:id',searchController.findByIndex);

router.use('/',searchController.index);


module.exports = router;