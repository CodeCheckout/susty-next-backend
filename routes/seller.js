import express from 'express'
import {getSellerProducts} from '../controllers/seller'

const router = express.Router()
router.get('/seller/products', getSellerProducts)

module.exports = router
