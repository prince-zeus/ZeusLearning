const express = require('express');
const router = express.Router();
const {getAllTechnologies} = require('../controllers/technologiesController.js')

router.route('/')
    .get(getAllTechnologies);

module.exports = router;