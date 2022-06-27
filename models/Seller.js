import mongoose, {Schema} from 'mongoose'

const sellerSchema = new Schema(
    {
        products: {
            type: [String],
            default: 'null',
        },
        mySellings: {
            type: [String],
            default: 'null',
        },
        address: {
            type: String,
            validate: [
                {
                    validator: function (value) {
                        return !value.includes('$')
                    },
                    message: 'Incorrect character!',
                },
                {
                    validator: function (value) {
                        return !value.includes('<')
                    },
                    message: 'Incorrect character!',
                },
                {
                    validator: function (value) {
                        return !value.includes('>')
                    },
                    message: 'Incorrect character!',
                },
                {
                    validator: function (value) {
                        return !value.includes('?')
                    },
                    message: 'Incorrect character!',
                },
            ],
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

export default mongoose.model('Seller', sellerSchema)
