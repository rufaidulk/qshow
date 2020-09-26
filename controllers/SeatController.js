const Seat = require('../models/Seat');
const EventShow = require('../models/EventShow');

exports.list = (req, res) => {
    Seat.find({'eventShowId': req.query.event_show_id}).then((seats) => {
        res.json(seats);
    })
};