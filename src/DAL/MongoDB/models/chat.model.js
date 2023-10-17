import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    messages: {
        type: [{
            user: {type: String},
            message: {type: String}
        }],
        default:[]
    }
});

export const chatModel = mongoose.model('Chat', chatSchema);