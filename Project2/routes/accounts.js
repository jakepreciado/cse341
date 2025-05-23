const express = require('express');
const router = express.Router();

const accountsController = require('../controllers/accounts');
const validate = require('../middleware/validate');

router.get('/', accountsController.getAllAccounts);

router.get('/:id', accountsController.getAccountById);

router.post('/', validate.saveAccount, accountsController.createAccount);

router.put('/:id', validate.saveAccount, accountsController.updateAccount);

router.delete('/:id', accountsController.deleteAccount);

module.exports = router;