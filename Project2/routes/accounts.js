const express = require('express');
const router = express.Router();

const accountsController = require('../controllers/accounts');
const validate = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', accountsController.getAllAccounts);

router.get('/:id', accountsController.getAccountById);

router.post('/', isAuthenticated, validate.saveAccount, accountsController.createAccount);

router.put('/:id', isAuthenticated, validate.saveAccount, accountsController.updateAccount);

router.delete('/:id', isAuthenticated, accountsController.deleteAccount);

module.exports = router;