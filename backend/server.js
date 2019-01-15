const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 4000;
const mongoose = require('mongoose');
const eventRoutes = express.Router();

let Event = require('./event.model');

app.use(cors());
app.use(bodyParser.json());
app.use('/events', eventRoutes);

mongoose.connect('mongodb://127.0.0.1:27017/events', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
});

eventRoutes.route('/').get(function(req, res) {
	Event.find(function(err, events) {
		if(err)
			console.log(err);
		else
			res.json(events);
	});
});

eventRoutes.route('/:id').get(function(req, res) {
	let id = req.params.id;
	Event.findById(id, function(err, event) {
		res.json(event);
	});
});

eventRoutes.route('/update/:id').post(function(req, res) {
	Event.findById(req.params.id, function(err, event) {
		if(!event)
			res.status(404).send("Event Not Found");
		else
			event.eventName = req.body.eventName;
			event.eventDate = req.body.eventDate;
			event.eventTime = req.body.eventTime;
			event.eventDescription = req.body.eventDescription;
			event.eventFollowerCount = req.body.eventFollowerCount;

			event.save().then(event => {
				res.json('Event Updated');
			}).catch(err => {
				res.status(400).send("Update failed");
			});
	});
});

eventRoutes.route('/add').post(function(req, res) {
	let event = new Event(req.body);
	console.log(req.body.eventName);
	console.log(req.body.eventDate);
	console.log(req.body.eventTime);
	console.log(req.body.eventDescription);
	console.log(req.body.eventFollowerCount);
	event.save().then(event => {
		res.status(200).json({'Event': 'Event Created Successfully'});
	}). catch(err => {
		res.status(400).send('Event creation Unsuccessful');
	});
});

app.listen(PORT, function() {
	console.log("Server is running on Port: " + PORT);
});

eventRoutes.route('/delete/:id').delete(function(req, res) {
	Event.findOneAndDelete({_id: req.params.id}, function(err, event) {
		if(err)
			res.json(err);
		else
			res.json('Event Deleted Successfully');
	});
});