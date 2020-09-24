const mongoose = require('mongoose');
const ServiceProvider = require('../models/ServiceProvider');

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

const eventShowSchema = new mongoose.Schema({
    serviceProvider: {
        type: ServiceProvider.schema,
        required: true
    },
    name: {
        type: String,
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

eventShowSchema.index({serviceProvider: 1, name: 1, date: 1}, {unique: true});

const EventShow = mongoose.model('event_show', eventShowSchema);

module.exports = EventShow;