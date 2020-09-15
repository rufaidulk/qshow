const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
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

const eventShowSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        index: true,
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    categories: [categorySchema]
});

const EventShow = mongoose.model('event_show', eventShowSchema);

module.exports = EventShow;