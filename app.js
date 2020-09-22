const mongoose = require('mongoose');
const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

//replacing default mongoose promie with ES6 Promise as it is depreciated.
mongoose.Promise = global.Promise;

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect('mongodb://localhost:27017/crud');
mongoose.connection.once('open', () => {
    console.log('connection has been made..');
}).on('error', (error) => {
    console.log(error);
});

const customerRouter = require('./routes/customer');
const serviceProviderRouter = require('./routes/serviceProvider');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));

app.use('/', customerRouter);
app.use('/', serviceProviderRouter);

app.listen(port);
console.log('Server listening at port http://localhost:' + port);