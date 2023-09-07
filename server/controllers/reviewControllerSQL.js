const dbActions = require('../sql/dbActions');

const reviewControllerSQL = {};

reviewControllerSQL.addReview = async (req, res, next) => {
  console.log('Entered addReview controller');
  try {
    const result = await dbActions.addReview(req.body); //
    res.locals.newReview = result;
    console.log('this is the new review:', res.locals.newReview);
    return next();
  } catch (err) {
    console.log('err: ', err);
    return next(err);
  }
};

reviewControllerSQL.getReview = async (req, res, next) => {
  console.log('Entered getReview controller');
  try {
    const result = await dbActions.getReview(req.query); // should grab title, author, book_id, genre
    res.locals.foundReview = result;
    console.log('found review: ', res.locals.foundReview);
    return next();
  } catch (err) {
    console.log('err: ', err);
    return next(err);
  }
};

reviewControllerSQL.deleteReview = async (req, res, next) => {
  console.log('Entered deleteReview controller');
  try {
    const result = await dbActions.deleteReview(req.body); // should grab book_id
    res.locals.deletedReview = result;
    console.log('deleted review: ', res.locals.deletedReview);
    return next();
  } catch (err) {
    console.log('err: ', err);
    return next(err);
  }
};

reviewControllerSQL.getAllUserReviews = async (req, res, next) => {
  console.log('Entered getAllUserReviews controller');
  try {
    const result = await dbActions.getAllUserReviews(req.query); // should grab user_id ---> do req.query for GET instead
    res.locals.userReviews = result;
    return next();
  } catch (err) {
    console.log('err: ', err);
    return next(err);
  }
};

module.exports = reviewControllerSQL;
