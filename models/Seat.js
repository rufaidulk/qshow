const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
    eventShowId: {
        type: ObjectId,
        required: true
    },
    categoryId: {
        type: ObjectId,
        required: true
    },
    seatNumber: {
        type: Number,
        required: true
    },
    status: {
        type: Number,
        required: true
    }
});

const Seat = mongoose.model('seats', seatSchema);

module.exports = Seat;