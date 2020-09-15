const mongoose = require('mongoose');
const assert = require('assert');
const EventShow = require('../models/EventShow.js');

describe('Event crud', () => {

    before((done) => {
        mongoose.connection.db.dropCollection('event_shows', () => {
            done();
        });
    })

    it('save data to db', (done) => {
        let dateStr = '12/05/2020';
        let startTimeStr = '02:16 PM';
        let endTimeStr = '05:16 PM';
        var eventShow = new EventShow({
            name: 'morning show',
            startTime: dateStr + ' ' + startTimeStr,
            endTime: `${dateStr} ${endTimeStr}`,
            date: new Date(dateStr),
            categories: [
                {name: 'Platinum', numOfSeats: 3, rate: 120}
            ]
        });

        eventShow.save().then(() => {
            assert(eventShow.isNew === false);
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            done();
        });
    });

    it('find an event', (done) => {
        EventShow.findOne({name: 'morning show'}).then((result) => {
            // console.log(result.endTime.toLocaleTimeString());
            done();
        })
    })

});