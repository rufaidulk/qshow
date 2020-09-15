const assert = require('assert');
const ServiceProvider = require('../models/ServiceProvider.js');

describe('Creating service providers', function() {
    
    it('save data to db', function(done) {
        var sp = new ServiceProvider({
            name: 'thomas',
            mobile: '98232832487',
            email: 'thomas@test.com',
            serviceCharge: 234
        })

        sp.save().then(function() {
            assert(sp.isNew === false);
            done();
        })
    });
    
});