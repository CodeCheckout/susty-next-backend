import express from 'express'
import {addProduct,fetchProducts} from '../controllers/product'

const router = express.Router()

router.post('/product/add', addProduct)
router.get('/product/fetch-products', fetchProducts)

module.exports = router
