const mongoose = require('mongoose');

const errorHandler = (err, req, res, next) => {
  // Mongoose validation error
  if (err instanceof mongoose.Error.ValidationError) {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ message: 'Validation error', errors: messages });
  }

  // CastError (invalid ObjectId)
  if (err instanceof mongoose.Error.CastError) {
    return res.status(400).json({ message: 'Invalid id format' });
  }

  // If the error has a status, use it
  if (err.status && Number.isInteger(err.status)) {
    return res.status(err.status).json({ message: err.message });
  }

  // Generic
  // eslint-disable-next-line no-console
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
};

module.exports = { errorHandler };
