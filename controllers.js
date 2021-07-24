const fastify = require('fastify');
const Movie = require('./movie.model');

// const create = async (req,res) {
const create = async (event) => {
  try {
    const newMovie = await Movie.create(event.body); // Events are sent in JSON format
    return {
      statuCode: 201,
      body: JSON.stringify(
        {
          message: 'new movie created',
          newMovie,
        },
        null,
        2
      ),
    };
  } catch (err) {
    return {
      statuCode: err.code || 500,
      message: JSON.stringify(err),
    };
  }
};

const getAll = async (event) => {
  try {
    const { limit = 5, page = 0, genre } = event.query;
    const filter = genre ? { genre } : {};
    const movies = await Movie.find(filter)
      .limit(limit * 1)
      .skip(limit * page)
      .sort('-createdAt');
    const count = await Movie.countDocuments(filter);
    return {
      message: 'returned all movies',
      body: JSON.stringify(
        {
          data: movies,
          meta: {
            total: Math.ceil(count / limit),
            page: parseInt(page),
          },
        },
        null,
        2
      ),
    };
  } catch (err) {
    return {
      statuCode: error.code || 500,
      message: JSON.stringify(err, null, 2),
    };
  }
};

const getOne = async (event) => {
  try {
    const movie = await Movie.findById(event.params.id); // same as req.params.id
    if (!movie) return { statuCode: 404, message: 'movie not found' };
    return {
      statusCode: 200,
      body: JSON.stringify(movie, null, 2),
    };
  } catch (err) {
    return {
      statusCode: err.code || 500,
      message: JSON.stringify(err, null, 2),
    };
  }
};

const updateOne = async (event) => {
  try {
    const movie = await Movie.findById(event.params.id); // same as req.params.id
    if (!movie) return { statuCode: 404, message: 'movie not found' };
    const updatedMovie = await Movie.findByIdAndUpdate(movie._id, event.body, {
      new: true,
    });
    return {
      statusCode: 200,
      body: JSON.stringify(updatedMovie, null, 2),
    };
  } catch (err) {
    return {
      statusCode: err.code || 500,
      message: JSON.stringify(err, null, 2),
    };
  }
};

const deleteOne = async (event) => {
  try {
    const movie = await Movie.findById(event.params.id); // same as req.params.id
    if (!movie) return { statuCode: 404, message: 'movie not found' };
    await movie.deleteOne();
    return {
      statusCode: 200,
      message: 'movie deleted successfully',
    };
  } catch (err) {
    return {
      statusCode: err.code || 500,
      message: JSON.stringify(err, null, 2),
    };
  }
};

module.exports = {
  create,
  getAll,
  getOne,
  updateOne,
  deleteOne,
};
