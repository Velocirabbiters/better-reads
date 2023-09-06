const path = require('path');
const express = require('express');

// require controllers
const { restart } = require('nodemon');
const userController = require('./controllers/userControllers');
const bookController = require('./controllers/bookControllers');

const app = express();
const PORT = 3005;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../src')));

// create a new user
app.post('/signup', userController.createUser, (req, res) =>
  res.status(200).json(res.locals.newUser),
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

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
