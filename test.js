var mongoose = require('mongoose');

// make a connection
mongoose.connect('mongodb://localhost:27017/test2');

// get reference to database
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
    console.log("Connection Successful!");

    // define Schema
    var BookSchema = mongoose.Schema({
      name: String,
      price: Number,
      quantity: Number
    });

    // compile schema to model
    var Book = mongoose.model('Book', BookSchema, 'bookstore');

    // documents array
    var books = { name: 'Mongoose Tutorial', price: 10, quantity: 25 }
    // save multiple documents to the collection referenced by Book Model
    Book.collection.insert(books, function (err, docs) {
      if (err){
          return console.error(err);
      } else {
        console.log("Multiple documents inserted to Collection");
      }
    });

});