const express = require('express');
const router = express.Router();
const { handleAppliedJob, getAppliedJob } = require('../controllers/appliedJobController');

router.post('/', handleAppliedJob);

router.post('/:id', getAppliedJob)

module.exports = router;