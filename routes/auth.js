import express from 'express'
import {authenticateUser} from '../controllers/auth'

const router = express.Router()

router.post('/user/auth', authenticateUser)
router.post('/user/updateusername', authenticateUser)
router.post('/user/updateuserrole', authenticateUser)
router.post('/user/updateuseraddress', authenticateUser)

module.exports = router
