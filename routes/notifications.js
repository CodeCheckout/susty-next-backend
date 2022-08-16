import express from 'express'
import {
    addNotification,
    updateNotification,
    getNotification,
    deleteNotification,
} from '../controllers/notifications'

const router = express.Router()

router.post('/notification/addNotification', addNotification)

router.put('/notification/updateNotification', updateNotification)

router.get('/notification/getNotification', getNotification)

router.delete('/notification/deleteNotification', deleteNotification)

module.exports = router
