const express = require('express');
const router = express.Router();
const {getAllJobRoles} = require('../controllers/jobRolesController.js')

router.route('/')
    .get(getAllJobRoles);

module.exports = router;