import mongoose from 'mongoose'

const {Schema} = mongoose

const favouritesSchema = new Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        favouriteProductList: {
            type: [String],
            required: true,
            default: [],
        },
    },
    {
        timestamps: true,
    }
)

export default mongoose.model('Favourites', favouritesSchema)
