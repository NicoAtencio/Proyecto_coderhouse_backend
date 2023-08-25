import mongoose from 'mongoose';

const URI = 'mongodb+srv://nicolasatencio90:Tengounperro_4patas@cluster0.u5bihkz.mongodb.net/ecommerce?retryWrites=true&w=majority';
mongoose.connect(URI)
.then(() => {console.log('Conectado a la base de datos');})
.catch((error) => {console.log(error);})

