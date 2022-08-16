import express from 'express'
import {
    adduser,
    updateUser,
    getUserAddress,
    addMySellings,
    addProductToAccount,
    getSellerProducts,
    removeUser,
    getUserDetails,
    getSellers,
} from '../controllers/user'

const router = express.Router()

router.post('/user/adduser', adduser)

router.put('/user/updateuser', updateUser)

router.get('/user/getaddress', getUserAddress)

// seller routes
router.put('/user/add-products-seller', addProductToAccount)
router.put('/user/add-mySellings', addMySellings)
router.get('/user/fetch-seller-products', getSellerProducts)
router.get('/user/fetch-user-details', getUserDetails)
router.get('/user/fetch-sellers', getSellers)

// for testing only
router.delete('/user/remove', removeUser)


module.exports = router
