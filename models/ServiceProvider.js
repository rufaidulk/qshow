const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServiceProviderSchema = new Schema({
    name: String,
    mobile: String,
    email: String,
    serviceCharge: Number
});

const ServiceProvider = mongoose.model('service_provider', ServiceProviderSchema);

module.exports = ServiceProvider;