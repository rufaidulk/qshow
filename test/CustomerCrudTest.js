const mongoose = require('mongoose');
const assert = require('assert');
const Customer = require('../models/Customer.js');

//describe test
describe('Customer crud', function() {

    before((done) => {
        mongoose.connection.db.dropCollection('customers', () => {
            done();
        });
    })

    var customer = new Customer({
        name: 'Arjun',
        mobile: '98465498764',
        email: 'arjun@test.com'
    });

    it('create', function(done) {
        customer.save().then(function() {
            assert(customer.isNew === false);
            done();
        });
    });

    it('Read', function(done) {
        Customer.findOne({name: 'Arjun'}).then(function(result) {
            assert(result.name === 'Arjun');
            done();
        })
    });

    it('Find by id', function(done) {
        Customer.findOne({_id: customer._id}).then(function(result) {
            assert(result._id.toString() === customer._id.toString());
            done();
        })
    });

    it('Find and update', function(done) {
        Customer.findOneAndUpdate({name: 'Arjun'}, {name: 'Dany'}).then(function() {
            Customer.findOne({_id: customer._id}).then(function(result) {
                assert(result.name === 'Dany');
                done();
            })
        })
    });

    it.skip('find one and delete', function(done) {
        Customer.findOneAndRemove({name: 'Arjun'}).then(function() {
            Customer.findOne({name: 'Arjun'}).then(function(result) {
                assert(result === null);
                done();
            })
        })
    });
});
