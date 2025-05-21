const express = require('express');
const router = express.Router();

const gamesController = require('../controllers/games');
const validate = require('../middleware/validate');

router.get('/', gamesController.getAllGames);

router.get('/:id', gamesController.getGameById);

router.post('/', validate.saveGame, gamesController.createGame);

router.put('/:id', validate.saveGame, gamesController.updateGame);

router.delete('/:id', gamesController.deleteGame);

module.exports = router;