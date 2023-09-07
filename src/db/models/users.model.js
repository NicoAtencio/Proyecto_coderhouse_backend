import mongoose from "mongoose";

const collection = 'User';

const userSchema = new mongoose.Schema({
    first_name: {
        type:String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    user_name: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        default: 'usuario'
    }
});

const userModel = mongoose.model(collection,userSchema);

export default userModel;