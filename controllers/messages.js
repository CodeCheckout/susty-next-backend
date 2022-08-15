import Message from '../models/messages'

//send Messages
export const sendMessages = async (req, res) => {

    const { sender, receiver, message, status } = req.body

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

}