import express from 'express'
import {
    addProduct,
    fetchProducts,
    filterProducts,
    getSingleProduct,
} from '../controllers/product'

const router = express.Router()

router.post('/product/add', addProduct)
router.get('/product/fetch-products', fetchProducts)
router.get('/product/fetch-single-product', getSingleProduct)
router.get('/product/filter-products', filterProducts)

module.exports = router
