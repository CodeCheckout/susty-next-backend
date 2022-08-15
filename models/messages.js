import mongoose from 'mongoose'

const {Schema} = mongoose

const messageSchema = new Schema(
    {
        sender: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        receiver: {
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
        }
    },
    {
        timestamps: true,
    }
)

export default mongoose.model('Messages', messageSchema)