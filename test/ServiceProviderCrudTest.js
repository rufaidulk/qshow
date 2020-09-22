const mongoose = require('mongoose');
const assert = require('assert');
const ServiceProvider = require('../models/ServiceProvider.js');

describe('Service providers crud', () => {
    
    before((done) => {
        mongoose.connection.db.dropCollection('service_providers', () => {
            done();
        });
    })
    
    var sp = new ServiceProvider({
        name: 'thomas',
        mobile: '98232832487',
        email: 'thomas@test.com',
        serviceCharge: 234
    });

    it('create', (done) => {
        sp.save().then(function () {
            assert(sp.isNew === false);
            done();
        });
    });

    it('Read', (done) => {
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

    it('update', (done) => {
        ServiceProvider.findOneAndUpdate({name: 'thomas'}, {name: 'jacob'}).then(() => {
            ServiceProvider.findOne({_id: sp._id}).then((result) => {
                assert(result.name === 'jacob');
                done();
            })
        })
    });

    
    it.skip('find and delete a service provider', (done) => {
        ServiceProvider.findOneAndRemove({name: 'thomas'}).then(function() {
            ServiceProvider.findOne({name: 'thomas'}).then(function(result) {
                assert(result === null);
                done();
            })
        })
    });
    
});