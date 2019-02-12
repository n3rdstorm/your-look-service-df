const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/fec');
const db = mongoose.connection;

module.exports = db;