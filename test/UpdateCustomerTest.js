const assert = require('assert');
const Customer = require('../models/Customer.js');

//describe test
describe('update customers', function() {

    var customer;

    beforeEach(function(done) {
        customer = new Customer({
            name: 'Arjun',
            mobile: '97979797977',
            email: 'arjun@test.com'
        });

        customer.save().then(function(){
            assert(customer.isNew === false);
            done();
        })
    });

    //create tests
    it('Find and update a customer', function(done) {
        Customer.findOneAndUpdate({name: 'Arjun'}, {name: 'Dany'}).then(function() {
            Customer.findOne({_id: customer._id}).then(function(result) {
                assert(result.name === 'Dany');
                done();
            })
        })
    });

});
