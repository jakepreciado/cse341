const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getGames = async (req, res) => {
    //#swagger.tags = ['Video Games']
    const result = await mongodb.getDatabase().db().collection('games').find();
    result.toArray().then((games) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(games);
    });
}

const getGameById = async (req, res) => {
    //#swagger.tags = ['Video Games']
    const gameId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('games').find({ _id: gameId });
    result.toArray().then((games) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(games[0]);
    });
}

const createGame = async (req, res) => {
    //#swagger.tags = ['Video Games']
    const newGame = {
        title: req.body.title,
        studio: req.body.studio,
        releaseDate: req.body.releaseDate,
        rating: req.body.rating,
        genre: req.body.genre,
    }
    const result = await mongodb.getDatabase().db().collection('games').insertOne(newGame);
    if (result.acknowledged) {
        res.status(200).send('Video game entry created successfully!');
    } else {
        res.status(500).json(result.error || 'Error creating video game entry');
    }
}

module.exports = {
    getGames,
    getGameById,
    createGame,
}