const express = require('express');
const router = express.Router();

const eventShowController = require('../controllers/EventShowController');

router.get('/event-show/index', eventShowController.index);
router.get('/event-show/create', eventShowController.create);
router.post('/event-show/create', eventShowController.store);
// router.get('/event-show/update/:id', eventShowController.edit);
// router.post('/event-show/update/:id', eventShowController.update);
// router.get('/event-show/delete/:id', eventShowController.delete);
// router.get('/event-show/view/:id', eventShowController.view);

module.exports = router;