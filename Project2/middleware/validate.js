const validator = require('../helpers/validate');

const saveGame = (req, res, next) => {
    const validationRule = {
        title: 'required|string',
        studio: 'required|string',
        releaseDate: 'required|date',
        rating: 'required|string',
        genre: 'string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
}

// If returned true, the request is valid, and will proceed to save the game to the database.
module.exports = {
    saveGame
};
