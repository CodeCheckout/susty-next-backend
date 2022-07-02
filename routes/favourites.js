import express from 'express'
import {
    getFavouritesProducts,
    addFavouritesProducts,
} from '../controllers/favourites'

const router = express.Router()

router.post('/favourites/add-favourites', addFavouritesProducts)
router.get('/favourites/fetch-favourites-product-list', getFavouritesProducts)

module.exports = router
