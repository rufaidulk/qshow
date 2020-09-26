const express = require('express');
const router = express.Router();

const seatController = require('../controllers/SeatController');

router.get('/seat/list', seatController.list);

module.exports = router;