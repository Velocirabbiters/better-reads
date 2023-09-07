const path = require('path');
const express = require('express');


// require controllers
const { restart } = require('nodemon');
const userController = require('./controllers/userControllers');
const bookController = require('./controllers/bookControllers');

// SQL controllers
const userControllerSQL = require('./controllers/userControllerSQL');
const bookControllerSQL = require('./controllers/bookControllerSQL');



const app = express();
const PORT = 3005;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../src')));

// SQL TESTS:
app.post('/books', bookControllerSQL.addBook, (req, res) => {
  return res.status(200).json(res.locals.newBook);
});
app.get('/books', bookControllerSQL.getBook, (req, res) => {
  return res.status(200).json(res.locals.foundBook);
})
app.get('/books/all', bookControllerSQL.getBooks, (req, res) => {
  return res.status(200).json(res.locals.allBooks);
})
app.patch('/books', bookControllerSQL.updateBook, (req, res) => {
  return res.status(200).json(res.locals.updatedBook);
})
app.delete('/books', bookControllerSQL.deleteBook, (req, res) => {
  return res.status(200).json(res.locals.deletedBook);
})

// create a new user
app.post('/signup', userControllerSQL.createUser, (req, res) =>
  res.status(200).json(res.locals.newUser)
);

// login
app.post(
  '/login',
  userController.verifyUser,
  (req, res) => res.status(200).json(res.locals),
  //   res.redirect('/dashboard'),
);

// app.get('/dashboard', (req, res) =>
//     res.sendFile()
// );

app.post('/library', bookController.getBooks, (req, res) =>
  res.status(200).json(res.locals.library),
);

// add book to dashboard
app.post(
  '/dashboard',
  bookController.addBook,
  userController.findUser,
  userController.addBook,
  (req, res) => res.status(200).json(res.locals.newLibrary),
);

// catch all
app.use('*', (req, res) => {
  res.sendStatus(404).send('What the dog doin?');
});

// global error handler
app.use((err, req, res, next) => {
  const defaultError = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred. RIP.' },
  };
  const errorObj = { ...defaultError, ...err };
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

const testapp = app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
module.exports = testapp;
