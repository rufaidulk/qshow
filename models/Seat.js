const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
    eventShowId: {
        type: mongoose.ObjectId,
        required: true
    },
    categoryId: {
        type: mongoose.ObjectId,
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