import Notification from '../models/notifications'

//add notification
export const addNotification = async (req, res) => {
    const { user, partner, favorite, message, status } = req.body

    const newNotification = new Notification({
        user,
        partner,
        favorite,
        message,
        status,
    })

        await Notification.create(newNotification)
            .then((notification) => {
                return res.status(200).json({
                    success: true,
                    message: 'Notification added successfully!',
                    notification,
                })
            })
            .catch((error) => {
                return res.status(500).json({
                    success: false,
                    message: 'Failed to add Notification!',
                    error,
                })
            })

}

//get notification
export const getNotification = async (req, res) => {

    const {user} = req.query

    await Notification.find({user: user})
    .then(async (notificationExist) => {
        if (notificationExist === null) {
            return res.status(400).json({
                message: 'There is no such Notification',
            })
        }
    })

    .then(async () => {
        await Notification.find({user: user})
            .then((notification) => {
                console.log(notification)
                return res.status(200).json({
                    success: true,
                    message: 'Notification fetched successfully!',
                    notification: notification,
                })
            })
            .catch((error) => {
                return res.status(400).json({
                    success: false,
                    message: 'Failed to fetch Notification!',
                    error,
                })
            })
    })

}

export const updateNotification = async (req, res) => {

}

export const deleteNotification = async (req, res) => {

}