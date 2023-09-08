const { Global } = require('@emotion/react');
const { Pool } = require('pg');

require('dotenv').config();

let PG_URL;
if (process.env.NODE_ENV === 'test') {
  PG_URL = process.env.TESTDATABASE_URL;
} else {
  PG_URL = process.env.DATABASE_URL;
}
// create a new pool here using the connection string above

console.log(PG_URL);

const pool = new Pool({
  connectionString: PG_URL,
  max: 5,
});
// TABLE SCHEMAS:
// user table:
// user_id [primary key]
// username = STRING
// password = STRING
// book table:
// book id (serial) [primary key]
// title
// author
// genre
// review table (JOIN between books and users)
// user id [foreign key]
// book id [foreign key]
// rating
// review
// follower table (JOIN between users and users)
// user1 id [foreign key]
// user2 id [foreign key]

const createTables = async () => {
  try {
    await pool.query(`CREATE TABLE IF NOT EXISTS users 
        (user_id SERIAL PRIMARY KEY NOT NULL,
        username VARCHAR(250) NOT NULL UNIQUE,
        password VARCHAR(250) NOT NULL);`);

    await pool.query(`CREATE TABLE IF NOT EXISTS books 
        (book_id SERIAL PRIMARY KEY NOT NULL,
        title VARCHAR(250) NOT NULL,
        author VARCHAR(250) NOT NULL,
        genre VARCHAR(250) NOT NULL);`);

    await pool.query(`CREATE TABLE IF NOT EXISTS reviews 
        (review_id SERIAL PRIMARY KEY NOT NULL,
        user_id INT NOT NULL,
        book_id INT NOT NULL,
        rating INT NOT NULL,
        review TEXT,
        FOREIGN KEY(user_id) REFERENCES users(user_id),
        FOREIGN KEY(book_id) REFERENCES books(book_id));`);

    await pool.query(`CREATE TABLE IF NOT EXISTS followers 
        (follower_id SERIAL PRIMARY KEY NOT NULL,
        user1_id INT NOT NULL,
        user2_id INT NOT NULL,
        FOREIGN KEY(user1_id) REFERENCES users(user_id),
        FOREIGN KEY(user2_id) REFERENCES users(user_id));`);

    console.log('Tables created successfully');
  } catch (err) {
    console.error('Failed to create tables:', err);
  }
};
if (process.env.NODE_ENV !== 'test') {
  createTables();
}
module.exports = {
  query: (text, params) => {
    console.log('executed query', text);
    return pool.query(text, params);
  },
  pool: pool,
  createTables: createTables,
};
