const mongooose = require('mongoose');
const assert = require('assert');
const Booking = require('../models/Booking');
const EventShow = require('../models/EventShow');
const Customer = require('../models/Customer');
const Seat = require('../models/Seat');

describe.only('Booking crud', () => {

    before((done) => {
        mongooose.connection.db.dropCollection('bookings', () => {
            done();
        });
    });

    it('Save booking', async () => {
        let eventShow = await EventShow.findOne();
        let seat = await Seat.findOne({eventShowId: eventShow._id});
        let category = await eventShow.categories.id(seat.categoryId);
        let customer = await Customer.findOne();

        let booking = new Booking({
            bookingNumber: 'A13434',
            customer: customer,
            eventShow: eventShow,
            seatNumber: seat.seatNumber,
            seatCategory: category
        });
        
        await booking.save();

        assert(booking.isNew === false);
    });
});