const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');

const DB =
  'mongodb+srv://sudoaptrana:aryan012@cluster0.ttung.mongodb.net/FoodApp?retryWrites=true&w=majority';

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DATABASE is connected');
  })
  .catch((err) => {
    console.error('Connection error', err);
  });

const port = 7000;
app.listen(port, () => {
  console.log(`App is listening on ${port}`);
});
