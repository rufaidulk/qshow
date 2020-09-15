const Customer = require('../models/Customer.js');

exports.index = (req, res) => {
    Customer.find().then((result) => {
        res.render('customer/index', {title: 'Customer List', customers: result});
    });
};

exports.create = (req, res) => {
    res.render('customer/create', {title: 'Create Customer'});
};

exports.store = (req, res) => {
    var customer = new Customer({
        name: req.body.name,
        mobile: req.body.mobile,
        email: req.body.email
    });

    customer.save((err, data) => {
        if (err) {
            throw err;
        }
        res.redirect('/customer/index');
    })
};

exports.edit = (req, res) => {
    Customer.findOne({_id: req.params.id}).then((result) => {
        res.render('customer/update', {
            title: 'Update Customer: ' + result.name.toUpperCase(), 
            customer: result
        });
    })
};

exports.update = (req, res) => {
    Customer.findOneAndUpdate({_id: req.params.id}, req.body).then(() => {
        res.redirect('/customer/index');
    });
};

exports.delete = (req, res) => {
    Customer.findOneAndRemove({_id: req.params.id}).then(() => {
        res.redirect('/customer/index');
    })
};

exports.view = (req, res) => {
    Customer.findOne({_id: req.params.id}).then((result) => {
        res.render('customer/view', {
            title: 'View Customer: ' + result.name,
            customer: result
        });
    });
};