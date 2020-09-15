const assert = require('assert');
const EventShow = require('../models/EventShow.js');

describe('Creating event show', () => {

    it('save data to db', (done) => {
        var eventShow = new EventShow({
            name: 'morning show',
            startTime: Date.now(),
            endTime: Date.now(),
            date: Date.now(),
            categories: [
                {name: 'Platinum', numOfSeats: 3, rate: 120}
            ]
        });

        eventShow.save().then(() => {
            assert(eventShow.isNew === false);
            done();
        });
    });

});