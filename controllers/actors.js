var db = require('../config/queries')
var utils = require('../helpers/utils')

var getAllActors = (req, res) => {
	db.findAll('actor_id, login, avatar_url, created_at', 'event_id', 'DESC', function(err, rows) {
		if (err) res.status(400).json();

		const result = rows.sort((a, b) => a.login.localeCompare(b.login));
		var sortbyEvent = utils.sortActorsByEvent(result)
		var sortbyTime = utils.sortActorsByTime(sortbyEvent)

		var structure = sortbyTime.map(s => {
			const obj = {
				id: s.actor_id,
				login: s.login,
				avatar_url: s.avatar_url
			}
			return obj
		})
		res.status(200).json(structure);
	})
};

var updateActor = (req, res) => {
	const {body: {id, avatar_url}} = req;

	db.find('actor_id', 'actor_id', id, function(err, rows) {
		if (err) {
			res.status(400).json()
			return
		};

		if (!rows.length) {
			res.status(404).json();
			return
		};

		db.update(avatar_url, id, function(err) {
			if (err) {
				res.status(400).json()
				return
			};

			res.status(200).json()
		})
	})
};

var getStreak = (req, res) => {
	db.findAll('actor_id, login, avatar_url, created_at', 'event_id', 'DESC', function(err, rows) {
		if (err) res.status(400).json();

		var sortbyStreak = utils.sortActorsStreak(rows)
		var sortbyTime = utils.sortActorsStreakByTime(sortbyStreak)

		var structure = sortbyTime.map(s => {
			const obj = {
				id: s.actor_id,
				login: s.login,
				avatar_url: s.avatar_url
			}
			return obj
		})
		res.status(200).json(structure);
	})
};


module.exports = {
	updateActor: updateActor,
	getAllActors: getAllActors,
	getStreak: getStreak
};

















