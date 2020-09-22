const mongoose = require('mongoose');
const assert = require('assert');
const EventShow = require('../models/EventShow.js');
const Seat = require('../models/Seat.js');

describe('Seat crud', () => {
    
    let dateStr = '12/05/2020';
    let startTimeStr = '02:16 PM';
    let endTimeStr = '05:16 PM';
    let eventShow = new EventShow({
        name: 'noon show',
        startTime: dateStr + ' ' + startTimeStr,
        endTime: `${dateStr} ${endTimeStr}`,
        date: new Date(dateStr),
        categories: [
            {name: 'Platinum', numOfSeats: 3, rate: 120}
        ]
    });

    before((done) => {
        mongoose.connection.db.dropCollection('seats', () => {
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
    })
    

    // it('find an event', (done) => {
    //     EventShow.findOne({name: 'morning show'}).then((result) => {
            // console.log(result.endTime.toLocaleTimeString());
    //         done();
    //     })
    // })

});