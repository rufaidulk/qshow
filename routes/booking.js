const express = require('express');
const router = express.Router();

const bookingController = require('../controllers/BookingController');

// router.get('/booking/index', bookingController.index);
router.get('/booking/create', bookingController.create);
// router.post('/booking/create', bookingController.store);
// router.get('/booking/update/:id', bookingController.edit);
// router.post('/booking/update/:id', bookingController.update);
// router.get('/booking/delete/:id', bookingController.delete);
// router.get('/booking/view/:id', bookingController.view);

module.exports = router;