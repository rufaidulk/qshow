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

exports.edit = async (req, res) => {
    let serviceProviders = await ServiceProvider.find().select(['name', 'mobile']);
    let eventShow = await EventShow.findOne({_id: req.params.id});
    let currentStartTime = ("0" + eventShow.startTime.getHours()).slice(-2) + ":" + 
        ("0" + eventShow.startTime.getMinutes()).slice(-2);
    let currentEndTime = ("0" + eventShow.endTime.getHours()).slice(-2) + ":" + 
        ("0" + eventShow.endTime.getMinutes()).slice(-2);

    const offset = eventShow.date.getTimezoneOffset();
    let currentDate = new Date(eventShow.date.getTime() + (offset*60*1000));
    currentDate = currentDate.toISOString().split('T')[0];
    
    res.render('event-show/update', {
        title: 'Update Event: ' + eventShow.name.toUpperCase(), 
        eventShow: eventShow,
        serviceProviders: serviceProviders,
        currentStartTime: currentStartTime,
        currentEndTime: currentEndTime,
        currentDate: currentDate
    });
};

exports.update = async (req, res) => {
    try
    {
        let eventShow = await updateEventShow(req);
        await Seat.deleteMany({eventShowId: eventShow._id});
        await saveSeats(eventShow);
     
        res.redirect('/event-show/index');
    }
    catch(error) {
        console.log(error.message);
    }
};

exports.delete = async (req, res) => {
    
    try
    {
        await EventShow.findOneAndRemove({_id: req.params.id});
        await Seat.deleteMany({eventShowId: req.params.id});

        res.redirect('/event-show/index');
    }
    catch(error) {
        console.log(error.message);
    }
};

exports.view = (req, res) => {
    EventShow.findOne({_id: req.params.id}).then((result) => {
        res.render('event-show/view', {
            title: 'View Event: ' + result.name,
            eventShow: result
        });
    });
};

async function saveEventShow(req)
{
    let categories = await getRequestedCategories(req);

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

async function updateEventShow(req)
{
    let categories = await getRequestedCategories(req);

    let serviceProvider = await ServiceProvider.findOne({_id: req.body.serviceProviderId});
    let reqEventShow = {
        serviceProvider: serviceProvider,
        name: req.body.name,
        startTime: req.body.date + ' ' + req.body.startTime,
        endTime: req.body.date + ' ' + req.body.endTime,
        date: req.body.date,
        categories: categories
    };

    let eventShow = await EventShow.findOneAndUpdate({_id: req.params.id}, reqEventShow, {new: true});

    return eventShow;
}

async function getRequestedCategories(req)
{
    if (! Array.isArray(req.body.categoryNames))
    {
        return [{
            name: req.body.categoryNames,
            numOfSeats: req.body.numOfSeats,
            rate: req.body.prices
        }];
    }

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

    return categories;
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