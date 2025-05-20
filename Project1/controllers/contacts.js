const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getContacts = async (req, res) => {
    //#swagger.tags = ['Contacts']
    const result = await mongodb.getDatabase().db().collection('contacts').find();
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    });
}

const getContactById = async (req, res) => {
    //#swagger.tags = ['Contacts']
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('contacts').find({ _id: contactId });
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts[0]);
    });
}

const createContact = async (req, res) => {
    //#swagger.tags = ['Contacts']
    const newContact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday,
    }
    const result = await mongodb.getDatabase().db().collection('contacts').insertOne(newContact);
    if (result.acknowledged) {
        res.status(200).send('Contact created successfully!');
    } else {
        res.status(500).json(result.error || 'Error creating contact');
    }
}

const updateContact = async (req, res) => {
    //#swagger.tags = ['Contacts']
    const contactId = new ObjectId(req.params.id);
    const updatedContact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday,
    }
    const result = await mongodb.getDatabase().db().collection('contacts').updateOne({ _id: contactId }, { $set: updatedContact });
    if (result.acknowledged) {
        res.status(200).send('Contact updated successfully!');
    } else {
        res.status(500).json(result.error || 'Error updating contact');
    }
}

const deleteContact = async (req, res) => {
    //#swagger.tags = ['Contacts']
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('contacts').deleteOne({ _id: contactId });
    if (result.acknowledged) {
        res.status(200).send('Contact successfully deleted!');
    } else {
        res.status(500).json(result.error || 'Error deleting contact');
    }
}

module.exports = {
    getContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact
}