import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

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
            type: [String],
            default: 'customer',
            enum: ['customer', 'seller', 'admin'],
        },
        userId: {
            type: String,
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
        },
        products: {
            type: [String],
        },
        mySellings: {
            type: [String],
        },
        rating: {
            type: Number,
        },
        following: {
            type: [Schema.Types.ObjectId],
        },
        followers: {
            type: [Schema.Types.ObjectId],
        },
        reviews: {
            type: [JSON],
        },
        resetPasswordToken: String,
        resetPasswordExpire: Date,
    },
    {
        timestamps: true,
    }
)

userSchema.methods.getSignedToken = function () {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    })
}

userSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString('hex')
    this.resetPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex')

    this.resetPasswordExpire = Date.now() + 10 * (60 * 1000)
    return resetToken
}
export default mongoose.model('User', userSchema)
