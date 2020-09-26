const mongoose = require('mongoose');

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

const seatSchema = new mongoose.Schema({
    eventShowId: {
        type: mongoose.ObjectId,
        required: true
    },
    category: {
        type: categorySchema,
        required: true
    },
    seatNumber: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

const Seat = mongoose.model('seats', seatSchema);

module.exports = Seat;