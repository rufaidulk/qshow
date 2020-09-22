const mongoose = require('mongoose');

//replacing default mongoose promie with ES6 Promise as it is depreciated.
mongoose.Promise = global.Promise;

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

//connect to db before start test
before((done) => {

	//connect to database
	mongoose.connect('mongodb://localhost:27017/crud');

	mongoose.connection.once('open', function () {
		console.log('connection has been made..');
		done();
	}).on('error', function (error) {
		console.log('Error');
		console.log(error);
	});
});

// drop the collections before each tests
// beforeEach((done) => {

    // mongoose.connection.collections.customers.drop(() => {
		// mongoose.connection.collections.event_shows.drop(() => {
			// mongoose.connection.collections.service_providers.drop(() => {
				// done();
			// });
		// });
	// });
	
	// mongoose.connection.db.dropCollection('service_providers', () => {
	// 	mongoose.connection.db.dropCollection('customers', () => {
	// 		done();
	// 	})
	// });

// });

after(() => {
	mongoose.connection.close();
})
