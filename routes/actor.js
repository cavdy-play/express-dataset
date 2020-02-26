var express = require('express');
var router = express.Router();
var actorController = require('../controllers/actors');

// Routes related to actor.
router.put('/', actorController.updateActor);
router.get('/', actorController.getAllActors);
router.get('/streak', actorController.getStreak);

module.exports = router;
