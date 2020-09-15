const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema and model
const CustomerSchema = new Schema({
    name: String,
    mobile: String,
    email: String
});


//param collection name and schema
const Customer = mongoose.model('customer', CustomerSchema);

//for accessing in other file.
module.exports = Customer;
