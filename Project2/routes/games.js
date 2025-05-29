const express = require('express');
const router = express.Router();

const gamesController = require('../controllers/games');
const validate = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', gamesController.getAllGames);

router.get('/:id', gamesController.getGameById);

router.post('/', isAuthenticated, validate.saveGame, gamesController.createGame);

router.put('/:id', isAuthenticated, validate.saveGame, gamesController.updateGame);

router.delete('/:id', isAuthenticated, gamesController.deleteGame);

module.exports = router;