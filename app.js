const fastify = require('fastify');
const cors = require('fastify-cors');

const mongoose = require('mongoose');
require('dotenv').config();

const controllers = require('./controllers');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/movie';
const PORT = process.env.PORT || 3000;

// Connect to the db
mongoose
  .connect(MONGO_URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((connection) => {
    console.log(`Database connected ::: ${connection.connection.host}`);
  })
  .catch((err) => {
    console.error(`Error ::: ${err.message}`);
    process.exit();
  });

// Initialize app
const app = fastify();

// CORS
app.register(cors, {
  origin: '*',
});

// Routes
app.get('/', controllers.getAll);
app.post('/create', controllers.create);
app.get('/:id', controllers.getOne);
app.put('/:id/update', controllers.updateOne);
app.delete('/:id/delete', controllers.deleteOne);

// Run as backend server if the file is called directly
if (require.main === module) {
  app.listen(PORT, (err) => {
    if (err) console.error(err);
    console.log(`server running on ${PORT}`);
  });
} else {
  // Execute as aws lambda function when required as a module
  module.exports = app;
}
