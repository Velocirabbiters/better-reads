const path = require('path');
const Book = require('../models/bookModels');
const User = require('../models/userModels');

const bookController = {};

// bookController.console = (req, res, next) => {
//     console.log('entered request')
//     return next();
// }

bookController.addBook = async (req, res, next) => {
  try {
    const { username, title, author, genre, summary, review } = req.body;
    console.log(title, author, genre, summary, review);
    const newBook = await Book.create({
      username,
      title,
      author,
      genre,
      summary,
      review,
    });
    // * After logging in should user's username be stored as endpoint =>/dashboard/username
    // const person = await User.findOne({ username: name });
    // person.library.push(newBook);
    res.locals.newBook = newBook;
    return next();
  } catch (err) {
    const error = {
      log: 'Error in createBook controller',
      status: 500,
      message: { err: 'Unable to add book. Try again later.' },
    };
    return next(error);
  }
};

bookController.deleteBook = async (req, res, next) => {
  try {
    const { username, title } = req.body;
    const user = await User.findOne({ username });
    if (!person) {
      throw new Error(`${username} was not found!`);
    }
    // for (let i = 0; i < user.library.length; i++) {
    //   if (user.library.title === title)
    // };
    // res.locals.deleted = deletedBook;
    return next();
  } catch (err) {
    const error = {
      log: `Failure in deleteBook middleware: ${err}`,
      status: 500,
      message: { err: err.message },
    };
    return next(error);
  }
};

bookController.getBooks = async (req, res, next) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error(`${username} was not found!`);
    }
    let library = await Book.find({ username });

    library = library.map(element => ({
      title: element.title,
      author: element.author,
      genre: element.genre,
      summary: element.summary,
      review: element.review,
    }));

    console.log('library', library);

    res.locals.library = library;
    return next();
  } catch (err) {
    const error = {
      log: `Failure in getBooks middleware: ${err}`,
      status: 500,
      message: { err: err.message },
    };
    return next(error);
  }
};

module.exports = bookController;
