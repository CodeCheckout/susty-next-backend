import express from 'express'
import {
    getFavouritesProducts,
    addFavouritesProducts,
    removeFavourites
} from '../controllers/favourites'

const router = express.Router()

router.post('/favourites/add-favourites', addFavouritesProducts)
router.get('/favourites/fetch-favourites-product-list', getFavouritesProducts)
router.delete('/favourites/remove-favourites',removeFavourites)

module.exports = router
