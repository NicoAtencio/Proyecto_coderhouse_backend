import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({
  products: {
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Products",
        },
        quantity: {
          type: Number,
        }
      }
    ],
    default: []
  }
});

export const cartModel = mongoose.model("Carts", cartsSchema);
