const jwt = require('jsonwebtoken');
const logger = require('./logger');

const requestLogger = (req, res, next) => {
  logger.info('Method:', req.method);
  logger.info('Path:  ', req.path);
  logger.info('Body:  ', req.body);
  logger.info('---');
  next();
};

const tokenExtractor = (req, res, next) => {
  const auth = req.get('authorization');

  if (auth && auth.startsWith('Bearer ')) {
    req.token = auth.replace('Bearer ', '');
  }

  next();
};

const userExtractor = (req, res, next) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  if (decodedToken) { req.user = decodedToken.id; }
  next();
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, req, res, next) => {
  logger.error(error);

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformed id' });
  }

  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  }

  if (error.name === 'JsonWebTokenError') {
    return res.status(400).json({ error: error.message });
  }

  return next(error);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
