const express = require('express');
const router = express.Router();

const contactsCpntroller = require('../controllers/contacts');

router.get('/', contactsCpntroller.getContacts);
router.get('/:id', contactsCpntroller.getContactById);

module.exports = router;