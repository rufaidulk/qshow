const Booking = require('../models/Booking');
const ServiceProvider = require('../models/ServiceProvider');

exports.create = async (req, res) => {
    let serviceProviders = await ServiceProvider.find();
    res.render('booking/create', {
        title: 'Create booking',
        serviceProviders: serviceProviders
    });
};