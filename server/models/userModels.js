const mongoose = require('mongoose');

const MONGO_URI =
  'mongodb+srv://caheriaguilar:vF6LI280RL8PAAQV@betterreads.ebwmnyp.mongodb.net/?retryWrites=true&w=majority';

mongoose
  .connect(MONGO_URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: 'betterReads',
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

const { Schema } = mongoose;
// const subSchema = new Schema({
//   title: { type: String, required: true },
//   author: { type: String, required: true },
//   genre: String,
//   summary: String,
//   review: Number,
// });

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  library: [
    {
      id: { type: Schema.Types.ObjectId, ref: 'book' },
    },
  ],
});

const User = mongoose.model('user', userSchema);

module.exports = User;
