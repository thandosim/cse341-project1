const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');

const getAll = async (req, res) => {
  const result = await mongodb.getDatabase().db('project1').collection('contacts').find();
  result.toArray().then((contacts) => {
    res.setHeader('content-type', 'application/json');
    res.status(200).json(contacts);
  });
};

const getSingle = async (req, res) => {
  const contactId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db('project1')
    .collection('contacts')
    .find({ _id: contactId });
  result.toArray().then((contacts) => {
    res.setHeader('content-type', 'application/json');
    res.status(200).json(contacts[0]);
  });
};

const createContact = async (req, res) => {
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb
    .getDatabase()
    .db('project1')
    .collection('contacts')
    .insertOne(contact);
  if (response.acknowledged) {
    res.setHeader('content-type', 'application/json');
    res.status(201).json(response);
  } else {
    res.setHeader('content-type', 'application/json');
    res.status(500).json( response.error || 'Could not create contact' );
  }
};

const updateContact = async (req, res) => {
  const contactId = new ObjectId(req.params.id);
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName, 
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };

  const response = await mongodb.getDatabase().db('project1').collection('contacts').updateOne(
    { _id: contactId },
    { $set: contact }
  );

  res.setHeader('content-type', 'application/json');
  if (response.modifiedCount > 0) {
    res.status(200).json({ message: 'Contact updated successfully', result: response });
  } else {
    res.status(404).json({ message: 'No changes made or contact not found' });
  }
};    

const deleteContact = async (req, res) => {
  const contactId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db('project1')
    .collection('contacts')
    .deleteOne({ _id: contactId });
  if (response.deletedCount > 0) {
    res.setHeader('content-type', 'application/json');
    res.status(200).json(response);
  } else {
    res.setHeader('content-type', 'application/json');
    res.status(500).json(response.error || 'Could not delete contact');
  }
};


module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};
