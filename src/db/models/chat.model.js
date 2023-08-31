import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    messages: [{
        user: {type: String},
        message: {type: String}
    }]
});

export const chatModel = mongoose.model('Chat', chatSchema);