const mocha = require('mocha');
const assert = require('assert');
const Customer = require('../models/Customer.js');

//describe test
describe('creating customers', function() {

    //create tests
    it('save data to database', function(done) {
        var customer = new Customer({
            name: 'Arjun',
            mobile: '98465498764',
            email: 'arjun@test.com'
        });

        customer.save().then(function() {
            assert(customer.isNew === false);
            done();
        });
    });
});
