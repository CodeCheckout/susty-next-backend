import express from 'express'
import {addProduct,fetchProducts,getSingleProduct} from '../controllers/product'

const router = express.Router()

router.post('/product/add', addProduct)
router.get('/product/fetch-products', fetchProducts)
router.get('/product/fetch-single-product', getSingleProduct)

module.exports = router
