import express from "express";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import chatRouter from "./routes/chat.router.js";
import loginRouter from "./routes/login.router.js";
import usersRouter from "./routes/users.router.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import { __dirname } from "./utils.js";
import './db/dbConfig.js';
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import "./passport/passportStrategies.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname+'/public'));

// HANDLEBARS
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'/views');
app.set('view engine', 'handlebars');

// cookies
app.use(cookieParser('secretKeyCookies'));

// session
app.use(session({
    store:MongoStore.create({
        mongoUrl: 'mongodb+srv://nicolasatencio90:Tengounperro_4patas@cluster0.u5bihkz.mongodb.net/ecommerce?retryWrites=true&w=majority'
    }),
    secret: 'secretSession',
    cookie: {maxAge:60000}
}));

// routes
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter)
app.use('/api/chats', chatRouter);
app.use('/api/login', loginRouter);
app.use('/api/users', usersRouter);

const PORT = 8080;

const httpServer = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}...`)
});

const socketServer = new Server(httpServer);

socketServer.on('connection', (socket) => {
    console.log(`Usuario ${socket.id} conectado`);
})

export default socketServer;