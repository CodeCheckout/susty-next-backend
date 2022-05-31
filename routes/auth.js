import express from 'express'
import {authenticateUser} from '../controllers/auth'

const router = express.Router()

router.post('/user/auth', authenticateUser)

module.exports = router
