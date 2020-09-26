const mongoose = require('mongoose');
const Customer = require('../models/Customer');
const EventShow = require('../models/EventShow');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    numOfSeats: {
        type: Number,
        required: true
    },
    rate: {
        type: Number,
        required: true
    }
});

const bookingSchema = mongoose.Schema({
    bookingNumber: {
        type: String,
        unique: true,
        required: true
    },
    customer: {
        type: Customer.schema,
        required: true
    },
    eventShow: {
        type: EventShow.schema,
        required: true
    },
    seatNumber: {
        type: String,
        required: true,
    },
    seatCategory: {
        type: categorySchema,
        required: true
    }
});

const Booking = mongoose.model('booking', bookingSchema);

module.exports = Booking;