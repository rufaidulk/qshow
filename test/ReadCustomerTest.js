const assert = require('assert');
const Customer = require('../models/Customer.js');

//describe test
describe('finding customers', function() {
    
    var customer;

    beforeEach(function(done) {
        customer = new Customer({
            name: 'Arjun',
            mobile: '9876476464',
            email: 'arjun@test.com'
        });

        customer.save().then(function() {
            assert(customer.isNew === false);
            done();
        });
    })

    //create tests
    it('Read customers', function(done) {
        Customer.findOne({name: 'Arjun'}).then(function(result) {
            assert(result.name === 'Arjun');
            done();
        })
    });

    it('Find customer by id', function(done) {
        Customer.findOne({_id: customer._id}).then(function(result) {
            assert(result._id.toString() === customer._id.toString());
            done();
        })
    });
});
