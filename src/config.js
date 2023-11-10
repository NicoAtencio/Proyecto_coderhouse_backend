import dotenv from "dotenv";

dotenv.config();

export default {
    port : process.env.PORT,
    mongo_uri : process.env.MONGO_URI,
    clientID : process.env.CLIENTID,
    clientSecret : process.env.CLIENTSECRET,
    environment : process.env.ENVIRONMENT,
    gmail_user : process.env.GMAIL_USER,
    gmail_password : process.env.GMAIL_PASSWORD
}