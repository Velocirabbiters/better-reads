const db = require('./connect');
const bcrypt = require('bcryptjs');
dbActions = {};


// BOOK DB ACTIONS

dbActions.addBook = async bookInfo => {
  const { title, author, genre } = bookInfo;
  const values = [title, author, genre];
  const query = `INSERT INTO books (title, author, genre)
    VALUES ($1, $2, $3)
    RETURNING book_id, title, author, genre;`;
  const result = await db.query(query, values);
  return result.rows[0];
};

// need to destructure to avoid things like bookInfo = {";drop table users;--":"getpwned"}
dbActions.getBook = async bookInfo => {
  const { title, author, book_id, genre } = bookInfo;
  const findBook = { title, author, book_id, genre };
  let query = `SELECT * FROM books WHERE 1 = 1`;
  let values = [];
  for (const [key, value] of Object.entries(findBook)) {
    if (value !== undefined) {
      query += ` and ${key} = $${values.length + 1}`;
      values.push(value);
    }
  }
  const result = await db.query(query, values);
  return result.rows;
};

dbActions.updateBook = async bookInfo => {
  const { book_id, title, author, genre } = bookInfo;
  const query = `UPDATE books
    SET title = $2, author = $3, genre = $4
    WHERE book_id = $1
    RETURNING book_id, title, author, genre;`;
  const result = await db.query(query, [book_id, title, author, genre]);
  return result.rows[0];
};

dbActions.deleteBook = async book => {
  const { book_id } = book;
  const values = [book_id];
  const query = `DELETE from books
    WHERE book_id = $1;`;
  const result = await db.query(query, values);
  return result.rows[0];
};

// USER DB ACTIONS

dbActions.createUser = async accountInfo => {
  const { username, password } = accountInfo;
  const hash = await bcrypt.hash(password, 10);
  const values = [username, hash];
  const query = `INSERT INTO users (username, password)
    VALUES ($1, $2)
    RETURNING user_id, username, password;`;
  const result = await db.query(query, values);
  return result.rows[0];
};

dbActions.verifyUser = async accountInfo => {
  const { username, password } = accountInfo;
  const values = [username];
  const query = `SELECT user_id, password FROM users
    WHERE username = $1`;
  const result = await db.query(query, values);
  if (result.rows.length === 0) {
    console.log('Username not found.');
    return;
  }
  const userID = result.rows[0].user_id;
  const dbPassword = result.rows[0].password;
  const isValid = await bcrypt.compare(password, dbPassword);
  if (isValid) {
    console.log('Username/password match!');
    return userID;
  } else {
    console.log('Username/password mismatch!');
    return;
  }
};

dbActions.getUsers = async () => {
  const query = `SELECT * FROM users;`;
  const result = await db.query(query);
  return result.rows;
};

// REVIEW DB ACTIONS

dbActions.addReview = async reviewInfo => {
  const { user_id, book_id, rating, review } = reviewInfo;
  const values = [user_id, book_id, rating, review];
  // if user_id, book_id don't match any user/book primary keys, will throw error?
  const query = `INSERT INTO reviews (user_id, book_id, rating, review)
    VALUES ($1, $2, $3, $4)
    RETURNING user_id, book_id, rating, review;`;
  const result = await db.query(query, values);
  return result.rows[0];
};

//STRETCH:
//add follower
//get review
//delete profile
//delete review
//search profile
//unfollow
//update profile
//edit review

dbActions;
module.exports = dbActions;
