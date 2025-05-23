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

const saveAccount = (req, res, next) => {
    const validationRule = {
        username: 'required|string',
        password: 'required|string',
        email: 'required|email',
        membership: 'required|string',
        startDate: 'required|date'
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
module.exports = {
    saveGame,
    saveAccount
};
