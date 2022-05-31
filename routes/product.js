import express from 'express'
import {addProduct} from '../controllers/product'

const router = express.Router()

router.post('/product/add', addProduct)

module.exports = router
