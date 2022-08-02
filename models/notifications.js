import mongoose from 'mongoose'

const {Schema} = mongoose

const notificationSchema = new Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        partnerId: {
            type: String,
            required: true,
        },
        favoriteID: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        status: {
            type: Boolean,
            required: true,
            default: false,
        }
    },
    {
        timestamps: true,
    }
)

export default mongoose.model('Notifications', notificationSchema)