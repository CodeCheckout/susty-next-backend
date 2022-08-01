import express from 'express'
import {authenticateUser, emailSignIn} from '../controllers/auth'

const router = express.Router()

router.post('/user/auth', authenticateUser)
router.post('/user/emailSignIn', emailSignIn)

module.exports = router
