const path = require('path');
require('dotenv').config();
const dbActions = require('../server/sql/dbActions');
const { pool, createTables } = require('../server/sql/connect');

describe('db unit tests', () => {
  beforeAll(async () => {
    await pool.query('drop table IF EXISTS users Cascade');
    await pool.query('drop table IF EXISTS reviews Cascade');
    await pool.query('drop table IF EXISTS followers Cascade');
    await pool.query('drop table IF EXISTS books Cascade');
    await createTables();
  });

  describe('SQL unit tests', () => {
    it('add book functionality', async () => {
      const newbook = {
        title: 'The Way of Kings',
        author: 'Brandon Sanderson',
        genre: 'Fantasy',
      };

      result = await dbActions.addBook(newbook);

      expect({
        title: result.title,
        author: result.author,
        genre: result.genre,
      }).toEqual(newbook);
    });

    it('update book functionality', async () => {
      const newbook = {
        title: 'Words of Radiance',
        author: 'Brandon Sanderson',
        genre: 'Fantasy',
      };

      const result = await dbActions.addBook(newbook);
      book = result;
      book.title = 'Dawnshard';

      const result2 = await dbActions.updateBook(book);
      expect(result2).toEqual(book);
    });

    it('delete book functionality', async () => {
      const newbook = {
        title: 'Oathbringer',
        author: 'Brandon Sanderson',
        genre: 'Fantasy',
      };

      const result = await dbActions.addBook(newbook);
      expect(result.book_id).not.toEqual(undefined);

      const result2 = await dbActions.deleteBook(result);
      const result3 = await dbActions.getBook(result);
      expect(result3[0]).toEqual(undefined);
    });

    it('testing for sql injection on getbook', async () => {
      const normalbook = {
        title: 'Rhythm of War',
        author: 'Brandon Sanderson',
        genre: 'Fantasy',
      };

      await dbActions.addBook(normalbook);

      const maliciousbook = {
        title: 'Rhythm of War',
        author: 'Brandon Sanderson',
        genre: 'Fantasy',
        '; drop table books;--': '; drop table books;--Get ReKt',
      };

      result = await dbActions.getBook(maliciousbook);
      expect(result[0]).toEqual({ ...normalbook, book_id: result[0].book_id });
    });

    it('testing getting book by author', async () => {
      const bookquery = { author: 'Brandon Sanderson' };

      await dbActions.addBook({
        title: 'Name of the Wind',
        author: 'Patrick Rothfuss',
        genre: 'Fantasy',
      });
      await dbActions.addBook({
        title: 'Words of Radiance',
        author: 'Brandon Sanderson',
        genre: 'Fantasy',
      });

      const result = await dbActions.getBook(bookquery);

      expect(result[0]).toEqual({
        book_id: 1,
        title: 'The Way of Kings',
        author: 'Brandon Sanderson',
        genre: 'Fantasy',
      });
      expect(result[1]).toEqual({
        book_id: 2,
        title: 'Dawnshard',
        author: 'Brandon Sanderson',
        genre: 'Fantasy',
      });
      expect(result[2]).toEqual({
        book_id: 4,
        title: 'Rhythm of War',
        author: 'Brandon Sanderson',
        genre: 'Fantasy',
      });
      expect(result[3]).toEqual({
        book_id: 6,
        title: 'Words of Radiance',
        author: 'Brandon Sanderson',
        genre: 'Fantasy',
      });
    });

    it('test create new user and verify user', async () => {
      const newuser = {
        username: 'Nate',
        password: 'hunter2',
      };
      const newuser2 = {
        username: 'Moiz',
        password: 'hunter3',
      };
      const newuser3 = {
        username: 'Anil',
        password: 'hunter4',
      };
      const newuser4 = {
        username: 'Christian',
        password: 'hunter5',
      };
      const result = await dbActions.createUser(newuser);
      await dbActions.createUser(newuser2);
      await dbActions.createUser(newuser3);
      await dbActions.createUser(newuser4);
      expect(result.username).toEqual(newuser.username);
      expect(result.password).not.toEqual(newuser.password);

      const result2 = await dbActions.verifyUser(newuser);
      expect(result2).not.toEqual(undefined);

      const result3 = await dbActions.verifyUser({ username: 'Nate' });
      expect(result3).toEqual(undefined);

      const result4 = await dbActions.verifyUser({
        username: 'Nate',
        password: 'hunter4',
      });
      expect(result4).toEqual(undefined);

      const result5 = await dbActions.verifyUser({
        username: 'Anil',
        password: 'hunter2',
      });
      expect(result5).toEqual(undefined);
    });
    it('test submit review', async () => {
      const result = await dbActions.addBook({
        title: 'Words of Radiance',
        author: 'Brandon Sanderson',
        genre: 'Fantasy',
      });
      const newReview = {
        user_id: 1,
        book_id: result.book_id,
        rating: 5,
        review: `Amazing book. Brandon Sanderson does an amazing job 
        creating and evolving characters in the world he creates.`,
      };
      const result2 = await dbActions.addReview(newReview);
      expect(result2).toEqual({ ...newReview, review_id: result2.review_id });
    });
    it('test delete review', async () => {
      const result = await dbActions.getBook({ title: 'Words of Radiance' });
      const newReview = {
        user_id: 2,
        book_id: result.book_id,
        rating: 5,
        review: `Garbage Book`,
      };
    });
  });

  afterAll(async () => {
    await pool.end();
  });
});
