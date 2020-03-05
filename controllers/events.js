var db = require('../config/queries')
var resStruture = require('../helpers/resStructure')

var getAllEvents = (req, res) => {
	db.findAll('*', 'event_id', 'ASC', function(err, rows) {
		if (err) res.status(400).json();

		const data = []
		if (rows.length !== 0) {
			rows.map(row => {
				const obj = resStruture(row)
				data.push(obj)
			})
		}
		const newData = data.sort((a,b) => +a.id - +b.id)
		res.status(200).json(newData);
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

	db.find('event_id', 'event_id', id, function(err, rows) {
		if (rows.length) {
			res.status(400).json()
			return
		} 

		db.insert(
			('event_id, type, actor_id, login, avatar_url, repo_id, name, url, created_at'),
			([id, type, actor_id, login, avatar_url, repo_id, name, url, created_at]),
			function() {
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
		
		const newData = data.sort((a,b) => +a.id - +b.id)
		res.status(200).json(newData);
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

















