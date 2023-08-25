import mongoose from "mongoose";

const messagesSchema = new mongoose.Schema({
    messages: [{
        user: {
            type: String,
            required: true
        },
        message: {
            type:String,
            required: true
        }
    }]
});

export const cartModel = mongoose.model('Messages', messagesSchema);