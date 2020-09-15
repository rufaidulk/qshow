const assert = require('assert');
const ServiceProvider = require('../models/ServiceProvider.js');

describe('Delete service providers', function() {

    var sp;

    beforeEach(function(done) {
        sp = new ServiceProvider({
            name: 'thomas',
            mobile: '9724242309',
            email: 'thomas@test.com',
            serviceCharge: 324
        });

        sp.save().then(function() {
            assert(sp.isNew === false);
            done();
        });
    });

    it('find and delete a service provider', function(done) {
        ServiceProvider.findOneAndRemove({name: 'thomas'}).then(function() {
            ServiceProvider.findOne({name: 'thomas'}).then(function(result) {
                assert(result === null);
                done();
            })
        })
    });

});