const assert = require('assert');
const ServiceProvider = require('../models/ServiceProvider.js');

describe('Update service providers', () => {

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

    it('update record', (done) => {
        ServiceProvider.findOneAndUpdate({name: 'thomas'}, {name: 'jacob'}).then(() => {
            ServiceProvider.findOne({_id: sp._id}).then((result) => {
                assert(result.name === 'jacob');
                done();
            })
        })
    });

});