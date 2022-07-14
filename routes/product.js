import express from 'express'
import {
    addProduct,
    fetchProducts,
    filterProducts,
    getSingleProduct,
    searchProducts
} from '../controllers/product'

const router = express.Router()

router.post('/product/add', addProduct)
router.get('/product/fetch-products', fetchProducts)
router.get('/product/fetch-single-product', getSingleProduct)
router.get('/product/filter-products', filterProducts)
router.get('/product/search-products', searchProducts)

module.exports = router
