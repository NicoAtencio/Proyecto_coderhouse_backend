import mongoose from "mongoose";

const ticketSchema = mongoose.Schema({
    code: {
        type:String,
        default: function() {
            // Generar el código automáticamente, por ejemplo, un código alfanumérico aleatorio
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const codeLength = 8;
            let generatedCode = '';
            for (let i = 0; i < codeLength; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                generatedCode += characters.charAt(randomIndex);
            }
            return generatedCode;
        }
    },
    purchase_datetime: {
        type: Date,
        default: Date.now
    },
    amount:{
        type: Number
        // Total de la compra
    },
    purchaser:{
        type: String
        // Email del usuario
    }
});

export const ticketModel = new mongoose.model('Ticket',ticketSchema);