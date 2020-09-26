const Booking = require('../models/Booking');
const Customer = require('../models/Customer');
const EventShow = require('../models/EventShow');
const Seat = require('../models/Seat');
const ServiceProvider = require('../models/ServiceProvider');

exports.index = (req, res) => {
    Booking.find().then((bookings) => {
        res.render('booking/index', {title: 'Bookings', bookings: bookings});
    })
};

exports.create = async (req, res) => {
    let customers = await Customer.find();
    let serviceProviders = await ServiceProvider.find();
    res.render('booking/create', {
        title: 'Create booking',
        serviceProviders: serviceProviders,
        customers: customers
    });
};

exports.store = async (req, res) => {
    try
    {
        console.log(req.body.customerId);
        let customer = await Customer.findOne({_id: req.body.customerId});
        console.log(customer);
        let eventShow = await EventShow.findOne({_id: req.body.eventShowId});
        let seat = await Seat.findOne({_id: req.body.seatId});
        
        let booking = new Booking({
            bookingNumber: Date.now(),
            customer: customer,
            eventShow: eventShow,
            seatNumber: seat.seatNumber,
            seatCategory: seat.category
        });

        await booking.save();
        res.redirect('/booking/index');
    }
    catch(error) {
        console.log(error);
    }
}

exports.delete = (req, res) => {
    Booking.findOneAndRemove({_id: req.params.id}).then(() => {
        res.redirect('/booking/index');
    })
}