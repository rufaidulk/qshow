const assert = require('assert');
const ServiceProvider = require('../models/ServiceProvider.js');

describe('Reading service providers', () => {

    var sp;

    beforeEach((done) => {
        sp = new ServiceProvider({
            name: 'thomas',
            mobile: '922324802423',
            email: 'thomas@test.com',
            serviceCharge: 323
        });

        sp.save().then(() => {
            assert(sp.isNew === false);
            done();
        });
    });

    it('Read service provider', (done) => {
        ServiceProvider.findOne({name: 'thomas'}).then((result) => {
            assert(result.name === 'thomas');
            done();
        })
    });

    it('Read by id', (done) => {
        ServiceProvider.findOne({_id: sp._id}).then((result) => {
            assert(result._id.toString() === sp._id.toString());
            done();
        })
    });

});