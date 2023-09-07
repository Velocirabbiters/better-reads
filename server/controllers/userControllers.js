const path = require('path');
const bcrypt = require('bcryptjs');
const User = require('../models/userModels');
const Book = require('../models/bookModels');

const userController = {};

userController.createUser = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    // if property is required you don't necessarily need this if conditional
    return next({
      log: 'Missing username or password in userController.createUser',
      status: 400,
      message: { err: 'An error ocurred' },
    });
  }

  const hash = await bcrypt.hash(password, 10);

  User.create({ username, password: hash })
    .then(response => {
      res.locals.newUser = response;
      return next();
    })
    .catch(err =>
      next({
        log: 'Error in userController.createUser',
        status: 500,
        message: { err: 'An error ocurred' },
      }),
    );
};

userController.verifyUser = (req, res, next) => {
  const { username, password } = req.body;

  User.findOne({ username })
    .then(async user => {
      if (!user) {
        // res.send('Incorrect username or password.')
        return next({
          log: 'Error occurred in userController.verifyUser',
          status: 401,
          message: { err: 'An error ocurred' },
        });
      }
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        // res.send('Incorrect username or password.')
        return next({
          log: 'Error occurred in userController.verifyUser',
          status: 401,
          message: { err: 'An error ocurred' },
        });
      }
      res.locals.user = user.username;
      //   console.log("successfully verified user")
      return next();
    })
    .catch(err =>
      next({
        log: 'Error occurred in userController.verifyUser',
        status: 500,
        message: { err: 'An error ocurred' },
      }),
    );
};

userController.findUser = async (req, res, next) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error('User was not found!');
    }
    // res.locals.library = user.library;
    return next();
  } catch (err) {
    const error = {
      log: 'Error in findBook controller',
      status: 500,
      message: { err: 'Unable to find user. Try again later.' },
    };
    return next(error);
  }
};

userController.addBook = async (req, res, next) => {
  try {
    const { username, title, author, genre, summary, review } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error('User was not found!');
    }

    user.library.push({ username, title, author, genre, summary, review });
    await user.save();
    // console.log('book saved');

    let newLibrary = await Book.find({ username });

    newLibrary = newLibrary.map(element => ({
      title: element.title,
      author: element.author,
      genre: element.genre,
      summary: element.summary,
      review: element.review,
    }));

    // console.log('new library', newLibrary);

    res.locals.newLibrary = newLibrary;
    return next();
  } catch (err) {
    const error = {
      log: 'Error in userController.addBook middleware',
      status: 500,
      message: { err: 'Unable to add book. Try again later.' },
    };
    return next(error);
  }
};

module.exports = userController;
