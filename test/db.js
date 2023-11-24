import mongoose from 'mongoose';
import config from '../src/config.js';
import "../src/DAL/MongoDB/models/carts.model.js"
// Esto es para que funcione el populate.

const URI = config.mongo_uri;
mongoose.connect(URI)
.then(() => {console.log('Conectado a la base de datos');})
.catch((error) => {console.log(error);})