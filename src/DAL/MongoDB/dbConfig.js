import mongoose from 'mongoose';
import config from '../../config.js';
import { logger } from '../../winston/winston.js';

const URI = config.mongo_uri;
mongoose.connect(URI)
.then(() => {logger.info('Conectado a la base de datos');})
.catch((error) => {logger.error(error);})

