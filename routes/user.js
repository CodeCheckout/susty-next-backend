import express from 'express'
import {adduser, updateUser, getUserAddress, addMySellings, addProductToAccount, getSellerProducts, removeUser} from '../controllers/user'

const router = express.Router()

router.post('/user/adduser', adduser)

router.put('/user/updateuser', updateUser)

router.get('/user/getaddress', getUserAddress)

// seller routes
router.put('/user/add-products-seller', addProductToAccount)
router.put('/user/add-mySellings', addMySellings)
router.get('/user/fetch-seller-products', getSellerProducts)

router.delete('/user/remove', removeUser)

module.exports = router
