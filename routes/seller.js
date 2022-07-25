import express from 'express'
import {
    addMySellings,
    addProductAsSeller,
    addProducts,
    getSellerProducts,
} from '../controllers/seller'

const router = express.Router()
router.get('/seller/fetch-products', getSellerProducts)
router.post('/seller/add-products', addProducts)

// add products
router.put('/seller/add-products-seller', addProductAsSeller)
router.put('/seller/add-mySellings-seller', addMySellings)

module.exports = router
