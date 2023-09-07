const dbActions = require('../sql/dbActions');

const bookControllerSQL = {};

bookControllerSQL.addBook = async (req, res, next) => {
  console.log('Entered addBook controller');
  try {
    const result = await dbActions.addBook(req.body); // should grab title, author, genre
    res.locals.newBook = result;
    console.log(res.locals.newBook);
    return next();
  } catch (err) {
    console.log('err: ', err);
    return next(err);
  }
};

bookControllerSQL.updateBook = async (req, res, next) => {
  console.log('Entered updateBook controller');
  try {
    const result = await dbActions.updateBook(req.body); // should grab book_id, title, author, genre
    res.locals.updatedBook = result;
    console.log('updated book: ', res.locals.updatedBook);
    return next();
  } catch (err) {
    console.log('err: ', err);
    return next(err);
  }
};

bookControllerSQL.getBook = async (req, res, next) => {
  console.log('Entered getBook controller');
  try {
    const result = await dbActions.getBook(req.query); // should grab title, author, book_id, genre
    res.locals.foundBook = result;
    console.log('found book: ', res.locals.foundBook);
    return next();
  } catch (err) {
    console.log('err: ', err);
    return next(err);
  }
};

bookControllerSQL.deleteBook = async (req, res, next) => {
  console.log('Entered deleteBook controller');
  try {
    const result = await dbActions.deleteBook(req.body); // should grab book_id
    res.locals.deletedBook = result;
    console.log('deleted book: ', res.locals.deletedBook);
    return next();
  } catch (err) {
    console.log('err: ', err);
    return next(err);
  }
};

// book table:
// book id (serial) [primary key]
// title
// author
// genre

// const query = `INSERT INTO lifts (lift, weight, reps, rpe, date, userid)
// VALUES ($1, $2, $3, $4, $5, $6)
// RETURNING id, lift, weight, reps, rpe, date`
// const values = [var1, var2, var3, var4, var5, var6]
// const result = await pool.query(
//     query,
//     values
//   );

//STRETCH - edit book
//STRETCH - delete book

module.exports = bookControllerSQL;
