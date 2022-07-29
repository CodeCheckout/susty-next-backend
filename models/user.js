import mongoose from 'mongoose'

const {Schema} = mongoose

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        image: {
            type: JSON,
            required: true,
            default: {
                url: 'https://firebasestorage.googleapis.com/v0/b/susty-next.appspot.com/o/default_profile_pic.png?alt=media&token=ddfbe30b-a94f-4390-94cf-416285ac2fde',
                name: 'default_profile_pic.png',
            },
        },
        role: {
            type: String,
            default: ['customer'],
            enum: ['customer', 'seller', 'admin'],
        },
        userId: {
            type: String,
            // required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
        },
        address: {
            type: String,
            required: true,
        },
        products: {
            type: [String],
            default: 'null',
        },
        mySellings: {
            type: [String],
            default: 'null',
        },
    },
    {
        timestamps: true,
    }
)

export default mongoose.model('User', userSchema)
