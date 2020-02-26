var db = require('../config/queries')
var resStruture = require('../helpers/resStructure')

var getAllEvents = (req, res) => {
	db.findAll('*', 'event_id', function(err, rows) {
		if (err) res.status(400).json();

		const data = []
		if (rows.length !== 0) {
			rows.map(row => {
				const obj = resStruture(row)
				data.push(obj)
			})
		}
		res.status(200).json(data);
	})
};

var addEvent = (req, res) => {
	const {
		id, type,
		actor:{
			id: actor_id, login, avatar_url
		},
		repo: {
			id: repo_id, name, url
		},
		created_at
	} = req.body;

	db.find('event_id', 'event_id', function(err, rows) {
		if (err) res.status(400).json();

		if (rows.length !== 0 && rows[0].event_id === id) res.status(400).json();

		db.insert(
			('event_id, type, actor_id, login, avatar_url, repo_id, name, url, created_at'),
			([id, type, actor_id, login, avatar_url, repo_id, name, url, created_at]),
			function(err) {
				if (err) res.status(400).json();
	
				res.status(201).json();
			}
		)
	})
};


var getByActor = (req, res) => {
	const {params: {actorId}} = req;
	db.find('*', 'actor_id', actorId, function(err, rows) {
		if (err) res.status(404).json();

		const data = []
		if (rows.length !== 0) {
			rows.map(row => {
				const obj = resStruture(row)
				data.push(obj)
			})
		}
		res.status(200).json(data);
	})
};


var eraseEvents = (req, res) => {
	db.remove('events', function(err) {
		if (err) res.status(404).json();

		res.status(200).json()
	})
};

module.exports = {
	getAllEvents: getAllEvents,
	addEvent: addEvent,
	getByActor: getByActor,
	eraseEvents: eraseEvents
};

















