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

module.exports = {
  getAll,
  getSingle
};
