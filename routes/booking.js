const express = require('express');
const router = express.Router();

const bookingController = require('../controllers/BookingController');

router.get('/booking/index', bookingController.index);
router.get('/booking/create', bookingController.create);
router.post('/booking/create', bookingController.store);
router.get('/booking/delete/:id', bookingController.delete);

module.exports = router;