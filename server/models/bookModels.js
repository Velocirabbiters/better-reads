const mongoose = require('mongoose');

const MONGO_URI =
  'mongodb+srv://nate:0812@betterreads.rwz5mua.mongodb.net/?retryWrites=true&w=majority';

mongoose
  .connect(MONGO_URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: 'betterreads',
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

const { Schema } = mongoose;

const bookSchema = new Schema({
  username: String,
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: String,
  summary: String,
  review: Number,
});

const Book = mongoose.model('book', bookSchema);

module.exports = Book;
