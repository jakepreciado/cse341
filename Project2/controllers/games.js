const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// const getAllGames = (req, res) => {
//     //#swagger.tags = ['Video Games']
//     console.log('Getting all video games...');
//     mongodb
//         .getDb()
//         .db()
//         .collection('games')
//         .find()
//         .toArray((err, games) => {
//             console.log('well, you madde it this far')
//             if (err) {
//                 res.status(400).json({ message: err });
//             }
//             res.setHeader('Content-Type', 'application/json');
//             res.status(200).json(games);
//         });
// };

const getAllGames = async (req, res) => {
    try {
        const games = await mongodb
            .getDb()
            .db()
            .collection('games')
            .find()
            .toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(games);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getGameById = async (req, res) => {
    //#swagger.tags = ['Video Games']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use valid ID to find a video game');
    }
    const gameId = new ObjectId(req.params.id);
    try {
        const result = await mongodb
            .getDb()
            .db()
            .collection('games')
            .findOne({ _id: gameId });
        if (!result) {
            return res.status(404).json({ message: 'Game not found' });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createGame = async (req, res) => {
    //#swagger.tags = ['Video Games']
    const newGame = {
        title: req.body.title,
        studio: req.body.studio,
        releaseDate: req.body.releaseDate,
        rating: req.body.rating,
        genre: req.body.genre,
    }
    const result = await mongodb
        .getDb()
        .db()
        .collection('games')
        .insertOne(newGame);
    if (result.acknowledged) {
        res.status(201).send('Video game created successfully!');
    } else {
        res.status(500).json(result.error || 'Error creating video game');
    }
}

const updateGame = async (req, res) => {
    //#swagger.tags = ['Video Games']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use valid ID to update a video game');
    }
    const gameId = new ObjectId(req.params.id);
    const updatedGame = {
        title: req.body.title,
        studio: req.body.studio,
        releaseDate: req.body.releaseDate,
        rating: req.body.rating,
        genre: req.body.genre,
    }
    const result = await mongodb
        .getDb()
        .db()
        .collection('games')
        .replaceOne({ _id: gameId }, updatedGame);
    console.log(result);
    if (result.acknowledged) {
        res.status(204).send('Video game updated successfully!');
    } else {
        res.status(500).json(result.error || 'Error updating video game');
    }
}

const deleteGame = async (req, res) => {
    //#swagger.tags = ['Video Games']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use valid ID to delete a video game');
    }
    const gameId = new ObjectId(req.params.id);
    const result = await mongodb
        .getDb()
        .db()
        .collection('games')
        .deleteOne({ _id: gameId });
    console.log(result);
    if (result.deletedCount > 0) {
        res.status(204).send('Video game successfully deleted!');
    } else {
        res.status(500).json(result.error || 'Error deleting video game');
    }
}

module.exports = {
    getAllGames,
    getGameById,
    createGame,
    updateGame,
    deleteGame
}