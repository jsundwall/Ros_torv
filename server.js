// BASE SETUP
// ======================================

// CALL THE PACKAGES --------------------
var express    = require('express');					// call express
var app        = express(); 									// define our app using express
var bodyParser = require('body-parser'); 			// get body-parser
var morgan     = require('morgan'); 					// used to see requests
var mongoose   = require('mongoose');					// Used to call the database
var User       = require('./app/models/user')	// Used to call the user.js
var config     = require('./config')					// Config file with info for DB and Port


// APP CONFIGURATION ---------------------
// use body parser so we can grab information from POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure our app to handle CORS requests
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
	next();
});

// log all requests to the console
app.use(morgan('dev'));

// connect to our database (hosted on modulus.io)
mongoose.connect(config.database);

// ROUTES FOR OUR API
// ======================================

// basic route for the home page
// Need to do changes here once routes have been set and defined.
app.get('/', function(req, res) {
	res.send('Welcome to the home page!');
});

// get an instance of the express router
var apiRouter = express.Router();

// middleware to use for all requests
apiRouter.use(function(req, res, next) {
	// do logging
	// Change to some meaningful logging
	console.log('A user accessed the API');

	next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working
// accessed at GET http://localhost:8080/api
// Also change to some meaningful logging
apiRouter.get('/', function(req, res) {
	res.json({ message: 'Welcome to Jungle API' });
});

// on routes that end in /users
// Keep this!
// ----------------------------------------------------
apiRouter.route('/users')

	// create a user (accessed at POST http://localhost:8080/users)
	.post(function(req, res) {

		// Add reward system here as an easy score counter, maybe use numbers as an identifier for the unlocked achievements?

		var user = new User();		// create a new instance of the User model
		user.name = req.body.name;  // set the users name (comes from the request)
		user.username = req.body.username;  // set the users username (comes from the request)
		user.password = req.body.password;  // set the users password (comes from the request)
		user.reward = req.body.reward; //set the users reward (comes from the request)

		user.save(function(err) {
			if (err) {
				// duplicate entry
				if (err.code == 11000)
					return res.json({ success: false, message: 'A user with that username already exists, Please choose another username '});
				else
					return res.send(err);
			}

			// return a message
			res.json({ message: 'User Successfully created!' });
		});

	})

	// get all the users (accessed at GET http://localhost:8080/api/users)
	// Maybe restricted to admin access? Normal users have no use for this info!
	.get(function(req, res) {
		User.find(function(err, users) {
			if (err) return res.send(err);

			// return the users
			res.json(users);
		});
	});

// on routes that end in /users/:user_id
// Remember to include the achievements!
// ----------------------------------------------------
apiRouter.route('/users/:user_id')

	// get the user with that id
	.get(function(req, res) {
		User.findById(req.params.user_id, function(err, user) {
			if (err) return res.send(err);

			// return that user
			res.json(user);
		});
	})

	// update the user with this id
	.put(function(req, res) {
		User.findById(req.params.user_id, function(err, user) {

			if (err) return res.send(err);

			// set the new user information if it exists in the request
			if (req.body.name) user.name = req.body.name;								// Change name of the user
			if (req.body.username) user.username = req.body.username;		// Change username
			if (req.body.password) user.password = req.body.password;		// Change the password
			if (req.body.reward) user.reward = req.body.reward;					// Change the reward of the user

			// save the user
			user.save(function(err) {
				if (err) return res.send(err);

				// return a message
				res.json({ message: 'User updated!' });
			});

		});
	})

	// delete the user with this id
	// Restricted to admin access! NEED TO BE MADE!
	.delete(function(req, res) {
		User.remove({
			_id: req.params.user_id
		}, function(err, user) {
			if (err) return res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});


// REGISTER OUR ROUTES -------------------------------
app.use('/api', apiRouter);

// START THE SERVER
// =============================================================================
app.listen(config.port);
console.log('Server opened at localhost: ' + config.port);
