import express from 'express'
import {updateUserName, updateUserRole, updateUserAddress, getUserAddress} from '../controllers/user'

const router = express.Router()

router.put('/user/updateusername', updateUserName)
router.put('/user/updateuserrole', updateUserRole)
router.put('/user/updateaddress', updateUserAddress)

router.get('/user/getaddress', getUserAddress)

module.exports = router
