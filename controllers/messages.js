import Message from '../models/messages'

//send Messages
export const sendMessages = async (req, res) => {
    const {sender, receiver, message, status} = req.body

    const newMessage = new Message({
        sender,
        receiver,
        message,
        status,
    })

    await Message.create(newMessage)
        .then((message) => {
            return res.status(200).json({
                success: true,
                message: 'Message sent successfully!',
                message,
            })
        })
        .catch((error) => {
            return res.status(500).json({
                success: false,
                message: 'Failed to add Message!',
                error,
            })
        })
}

//get Messages
export const getMessages = async (req, res) => {
    const {sender} = req.query

    await Message.find({sender: sender})
        .then(async (messagesExist) => {
            if (messagesExist === null) {
                return res.status(400).json({
                    message: 'There is no such meesages!',
                })
            }
        })

        .then(async () => {
            await Message.find({sender: sender})
                .then((message) => {
                    console.log(message)
                    return res.status(200).json({
                        success: true,
                        message: 'Messages fetched successfully!',
                        message: message,
                    })
                })
                .catch((error) => {
                    return res.status(400).json({
                        success: false,
                        message: 'Failed to fetch Messages!',
                        error,
                    })
                })
        })
}
