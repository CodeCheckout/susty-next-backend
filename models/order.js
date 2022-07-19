import mongoose from 'mongoose'
import express from 'express'

const {Schema} = mongoose
const orderSchema = new Schema({
    productId: {
        type: String,
        required: true,
    },
    seller: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    buyer: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    PayPalLog: {
        type: JSON,
        required: true,
    },
})

export default mongoose.model('Order', orderSchema)
