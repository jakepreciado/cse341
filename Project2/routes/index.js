const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags = ['Hello World']
    res.send('Hello World! This is the API for my CRUD project in CSE341.');
});

router.use('/games', require('./games'));

module.exports = router;