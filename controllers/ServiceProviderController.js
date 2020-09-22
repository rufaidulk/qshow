const ServiceProvider = require('../models/ServiceProvider.js');

exports.index = (req, res) => {
    ServiceProvider.find().then((result) => {
        res.render('service-provider/index', {title: 'Service Providers List', serviceProviders: result});
    });
};

exports.create = (req, res) => {
    res.render('service-provider/create', {title: 'Create Service Provider'});
};

exports.store = (req, res) => {
    let serviceProvider = new ServiceProvider({
        name: req.body.name,
        mobile: req.body.mobile,
        email: req.body.email,
        serviceCharge: req.body.service_charge
    });

    serviceProvider.save((err, data) => {
        if (err) {
            throw err;
        }
        res.redirect('/service-provider/index');
    })
};

exports.edit = (req, res) => {
    ServiceProvider.findOne({_id: req.params.id}).then((result) => {
        res.render('service-provider/update', {
            title: 'Update Service Provider: ' + result.name.toUpperCase(), 
            serviceProvider: result
        });
    })
};

exports.update = (req, res) => {
    ServiceProvider.findOneAndUpdate({_id: req.params.id}, req.body).then(() => {
        res.redirect('/service-provider/index');
    });
};

exports.delete = (req, res) => {
    ServiceProvider.findOneAndRemove({_id: req.params.id}).then(() => {
        res.redirect('/service-provider/index');
    })
};

exports.view = (req, res) => {
    ServiceProvider.findOne({_id: req.params.id}).then((result) => {
        res.render('service-provider/view', {
            title: 'View Service Provider: ' + result.name,
            serviceProvider: result
        });
    });
};