const express = require('express');
const router = express.Router();
const {getAllStreams} = require('../controllers/streamsController.js')

router.route('/')
    .get(getAllStreams);

module.exports = router;