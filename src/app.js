import express from "express";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import chatRouter from "./routes/chat.router.js";
import loginRouter from "./routes/login.router.js";
import usersRouter from "./routes/users.router.js";
import sessionRouter from "./routes/session.router.js";
import mockingRouter from "./routes/mocking.router.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import { __dirname } from "./utils.js";
import './DAL/MongoDB/dbConfig.js';
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import "./passport/passportStrategies.js";
import passport from "passport";
import  config  from "./config.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

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
        mongoUrl: config.mongo_uri
    }),
    secret: 'secretSession',
    cookie: {maxAge:3600000}
    // La sesion expira a la hora.
}));


// passport
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter)
app.use('/api/chats', chatRouter);
app.use('/api/login', loginRouter);
app.use('/api/users', usersRouter);
app.use('/api/session', sessionRouter);
app.use('/api/mocking', mockingRouter);

// Error
app.use(errorMiddleware);

const PORT = config.port;

const httpServer = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}...`)
});

const socketServer = new Server(httpServer);

socketServer.on('connection', (socket) => {
    console.log(`Usuario ${socket.id} conectado`);
})

export default socketServer;