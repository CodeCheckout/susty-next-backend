import express from 'express'
import {authenticateUser} from '../controllers/auth'
import {updateUserName, updateUserRole, updateUserAddress} from '../controllers/user'

const router = express.Router()

router.post('/user/auth', authenticateUser)

router.put('/user/updateusername', updateUserName)
router.put('/user/updateuserrole', updateUserRole)
router.put('/user/updateuseraddress', updateUserAddress)

module.exports = router
