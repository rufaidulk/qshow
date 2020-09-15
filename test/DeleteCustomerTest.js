const assert = require('assert');
const Customer = require('../models/Customer.js');

//describe test
describe('Delete customers', function() {

    var customer;

    beforeEach(function(done) {
        customer = new Customer({
            name: 'Arjun',
            mobile: '98797987679',
            email: 'arjun@test.com'
        });

        customer.save().then(function() {
            assert(customer.isNew === false);
            done();
        })
    })

    //create tests
    it('find one and delete', function(done) {
        Customer.findOneAndRemove({name: 'Arjun'}).then(function() {
            Customer.findOne({name: 'Arjun'}).then(function(result) {
                assert(result === null);
                done();
            })
        })
    });

});
