import express from 'express'
import {
    authenticateUser,
    emailSignIn,
    forgotPassword,
    loginUser,
    registerUser,
    resetPassword,
    verifyResetToken,
} from '../controllers/auth'

const router = express.Router()

router.post('/user/auth', authenticateUser)
router.post('/user/emailSignIn', emailSignIn)

// from JWT part
router.post('/user/register', registerUser)
router.post('/user/login', loginUser)
router.post('/user/forgotPassword', forgotPassword)
router.put('/user/resetPassword', resetPassword)
router.post('/user/verifyPasswordToken', verifyResetToken)

module.exports = router
