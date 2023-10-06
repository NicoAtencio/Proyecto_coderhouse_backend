import dotenv from "dotenv";

dotenv.config();

export default {
    port : process.env.PORT,
    mongo_uri : process.env.MONGO_URI,
    clientID : process.env.CLIENTID,
    clientSecret : process.env.CLIENTSECRET
}