var db = require('../config/queries')

var getAllEvents = () => {
	db.findAll('*', 'event_id', function(res) {
		console.log(res);
	})
};

var addEvent = () => {

};


var getByActor = () => {

};


var eraseEvents = () => {

};

module.exports = {
	getAllEvents: getAllEvents,
	addEvent: addEvent,
	getByActor: getByActor,
	eraseEvents: eraseEvents
};

















