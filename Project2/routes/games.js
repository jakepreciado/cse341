const express = require('express');
const router = express.Router();

const gamesController = require('../controllers/games');

router.get('/', gamesController.getGames);
router.get('/:id', gamesController.getGameById);

router.post('/', gamesController.createGame);

module.exports = router;