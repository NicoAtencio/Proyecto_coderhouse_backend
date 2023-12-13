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
    email:{
        type:String,
        required: true,
        unique: true
    },
    age:{
        type:Number
    },
    password: {
        type: String,
        required: true
    },
    cart:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Carts'
    },
    role: {
        type: String,
        enum: ['user','admin','premium'],
        default: 'user'
    },
    fromGithub: {
        type: Boolean,
        default: false
    },
    last_connection:{
        type: Date,
        default: Date.now
    }
});

const userModel = mongoose.model(collection,userSchema);

export default userModel;