require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const routes = require('./routes');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorHandler } = require('./middlewares/error');

const { PORT, DB_URL, LIMITER } = require('./utils/config');

const app = express();

app.use(express.json());

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});

app.use(cors({
  credentials: true,
  origin: ['https://api.movies-explorer-yp.nomoreparties.co', 'https://movies-explorer-yp.nomoreparties.co', 'http://localhost:3000', 'http://localhost:3000', 'https://localhost:3001', 'https://practicum.yandex.ru', 'http://practicum.yandex.ru'],
}));

app.use(helmet());
app.use(LIMITER);
app.use(requestLogger);
app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
