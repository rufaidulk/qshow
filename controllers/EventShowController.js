const EventShow = require('../models/EventShow.js');
const Seat = require('../models/Seat.js');
const ServiceProvider = require('../models/ServiceProvider');

exports.index = (req, res) => {
    EventShow.find().then((result) => {
        res.render('event-show/index', {title: 'Event List', eventShows: result});
    });
};

exports.create = async (req, res) => {
    let serviceProviders = await ServiceProvider.find().select(['name', 'mobile']);
    res.render('event-show/create', {title: 'Create an event', serviceProviders: serviceProviders});
};

exports.store = async (req, res) => {
    try
    {
        console.log(req.body);
        let eventShow = await saveEventShow(req);
        await saveSeats(eventShow);
        
        res.redirect('/event-show/index');
    }
    catch(error) {
        console.log(error.message);
    }
};

exports.edit = (req, res) => {
    ServiceProvider.findOne({_id: req.params.id}).then((result) => {
        res.render('event-show/update', {
            title: 'Update Service Provider: ' + result.name.toUpperCase(), 
            serviceProvider: result
        });
    })
};

exports.update = (req, res) => {
    ServiceProvider.findOneAndUpdate({_id: req.params.id}, req.body).then(() => {
        res.redirect('/event-show/index');
    });
};

exports.delete = (req, res) => {
    ServiceProvider.findOneAndRemove({_id: req.params.id}).then(() => {
        res.redirect('/event-show/index');
    })
};

exports.view = (req, res) => {
    ServiceProvider.findOne({_id: req.params.id}).then((result) => {
        res.render('event-show/view', {
            title: 'View Service Provider: ' + result.name,
            serviceProvider: result
        });
    });
};

async function saveEventShow(req)
{
    let categories = [];
    let categoryNames = req.body.categoryNames.filter(Boolean);
    if ((new Set(categoryNames)).size  !== categoryNames.length) {
        throw new Error('Category should be unique');
    }

    for (let i = 0; i < categoryNames.length; i++)
    {
        categories.push({
            name: categoryNames[i],
            numOfSeats: req.body.numOfSeats[i],
            rate: req.body.prices[i]
        });
    }

    let serviceProvider = await ServiceProvider.findOne({_id: req.body.serviceProviderId});
    let eventShow = new EventShow({
        serviceProvider: serviceProvider,
        name: req.body.name,
        startTime: req.body.date + ' ' + req.body.startTime,
        endTime: req.body.date + ' ' + req.body.endTime,
        date: req.body.date,
        categories: categories
    });

    await eventShow.save();

    return eventShow;
}

async function saveSeats(eventShow)
{
    let categories = eventShow.categories;
    let seats = [];

    categories.forEach(category => {
        let seatPrefix = category.name.charAt(0).toUpperCase();
        for (let i = 0; i < category.numOfSeats; i++)
        {
            seats.push({
                eventShowId: eventShow._id,
                categoryId: category._id,
                seatNumber: seatPrefix + i,
                status: 'active'
            });
        }
    });

    await Seat.insertMany(seats);
}