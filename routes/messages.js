import express from 'express'
import {
    sendMessages,
    getMessages
} from '../controllers/messages'

const router = express.Router()

router.post('/messages/sendMessages', sendMessages)

router.get('/messages/getMessages', getMessages)

module.exports = router