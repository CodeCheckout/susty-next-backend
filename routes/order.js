import express from 'express'
import { getBuyerOrders, getSellerOrders, placeOrder } from '../controllers/order';
const router = express.Router()

router.get('/orders/fetch-seller-orders', getSellerOrders )
router.get('/orders/fetch-buyer-orders', getBuyerOrders )

// for testing
router.post('/orders/create-order', placeOrder)

module.exports = router;