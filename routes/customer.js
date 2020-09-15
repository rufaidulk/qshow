const express = require('express');
const router = express.Router();

const customerController = require('../controllers/CustomerController');

router.get('/customer/index', customerController.index);
router.get('/customer/create', customerController.create);
router.post('/customer/create', customerController.store);
router.get('/customer/update/:id', customerController.edit);
router.post('/customer/update/:id', customerController.update);
router.get('/customer/delete/:id', customerController.delete);
router.get('/customer/view/:id', customerController.view);

module.exports = router;