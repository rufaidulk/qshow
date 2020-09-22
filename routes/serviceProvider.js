const express = require('express');
const router = express.Router();

const serviceProviderController = require('../controllers/ServiceProviderController');

router.get('/service-provider/index', serviceProviderController.index);
router.get('/service-provider/create', serviceProviderController.create);
router.post('/service-provider/create', serviceProviderController.store);
router.get('/service-provider/update/:id', serviceProviderController.edit);
router.post('/service-provider/update/:id', serviceProviderController.update);
router.get('/service-provider/delete/:id', serviceProviderController.delete);
router.get('/service-provider/view/:id', serviceProviderController.view);

module.exports = router;