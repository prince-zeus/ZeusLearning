const express = require('express');
const router = express.Router();
const {getAllColleges} = require('../controllers/collegesController.js')

router.route('/')
    .get(getAllColleges);

module.exports = router;