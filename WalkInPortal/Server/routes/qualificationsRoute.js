const express = require('express');
const router = express.Router();
const {getAllQualifications} = require('../controllers/qualificationsController.js')

router.route('/')
    .get(getAllQualifications);

module.exports = router;