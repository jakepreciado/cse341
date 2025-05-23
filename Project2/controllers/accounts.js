const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllAccounts = async (req, res) => {
    //#swagger.tags = ['READ (Get All)']
    try {
        const accounts = await mongodb
            .getDb()
            .db()
            .collection('accounts')
            .find()
            .toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(accounts);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getAccountById = async (req, res) => {
    //#swagger.tags = ['READ (Get By ID)']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use valid ID to find a video game');
    }
    const accountId = new ObjectId(req.params.id);
    try {
        const result = await mongodb
            .getDb()
            .db()
            .collection('accounts')
            .findOne({ _id: accountId });
        if (!result) {
            return res.status(404).json({ message: 'Account not found' });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createAccount = async (req, res) => {
    //#swagger.tags = ['CREATE']
    const newAccount = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        membership: req.body.membership,
        startDate: req.body.startDate
    }
    const result = await mongodb
        .getDb()
        .db()
        .collection('accounts')
        .insertOne(newAccount);
    if (result.acknowledged) {
        res.status(201).send('Account created successfully!');
    } else {
        res.status(500).json(result.error || 'Error creating account');
    }
}

const updateAccount = async (req, res) => {
    //#swagger.tags = ['UPDATE']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use valid ID to update an account');
    }
    const accountId = new ObjectId(req.params.id);
    const updatedAccount = {
        username: req.body.username,
        password: req.body.password,
        membership: req.body.membership,
        email: req.body.email,
        startDate: req.body.startDate
    }
    const result = await mongodb
        .getDb()
        .db()
        .collection('accounts')
        .replaceOne({ _id: accountId }, updatedAccount);
    console.log(result);
    if (result.acknowledged) {
        res.status(204).send('Account updated successfully!');
    } else {
        res.status(500).json(result.error || 'Error updating account');
    }
}

const deleteAccount = async (req, res) => {
    //#swagger.tags = ['DELETE']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use valid ID to delete an account');
    }
    const accountId = new ObjectId(req.params.id);
    const result = await mongodb
        .getDb()
        .db()
        .collection('accounts')
        .deleteOne({ _id: accountId });
    console.log(result);
    if (result.deletedCount > 0) {
        res.status(204).send('Account successfully deleted!');
    } else {
        res.status(500).json(result.error || 'Error deleting account');
    }
}

module.exports = {
    getAllAccounts,
    getAccountById,
    createAccount,
    updateAccount,
    deleteAccount
}