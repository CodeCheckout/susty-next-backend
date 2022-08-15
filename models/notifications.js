import mongoose from 'mongoose'

const {Schema} = mongoose

const notificationSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        partner: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        favorite: {
            type: Schema.Types.ObjectId,
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
        },
    },
    {
        timestamps: true,
    }
)

export default mongoose.model('Notifications', notificationSchema)
