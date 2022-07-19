import mongoose from "mongoose";
import express from "express";

const { Schema } = mongoose;
const orderSchema = new Schema(
  {
    productId: {
      type: String,
      required: true,
    },
    productName: {
      type: String,
    },
    seller: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    buyer: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    buyerName: {
      type: String,
    },
    sellerName: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    PayPalLog: {
      type: JSON,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", orderSchema);
