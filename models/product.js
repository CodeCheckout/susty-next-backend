import mongoose from 'mongoose'

const {Schema} = mongoose

const productSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
        mainCategory: {
            type: String,
            required: true,
            enum: ['Women', 'Men', 'Kids', 'Home', 'Entertainment'],
        },
        subCategory1: {
            type: String,
            required: true,
            enum: [
                'Clothes',
                'Shoes',
                'Bags',
                'Accessories',
                'Beauty',
                'Grooming',
                'Toys & games',
                'Baby care',
                'Strollers',
                'Chairs',
                'School supplies',
                'Textile',
                'Home accessories',
                'Video games & consoles',
                'Games & puzzles',
                'Music & video',
                'Books',
            ],
        },
        subCategory2: {
            type: String,
            required: true,
            enum: [
                'Coats & jackets',
                'Jumpers & sweaters',
                'Suits & blazers',
                'Dresses',
                'Skirts',
                'Jeans',
                'Pants & leggings',
                'Shorts & cropped pants',
                'Swimwear',
                'Boots',
                'Heels',
                'Flats',
                'Ankle boots',
                'Flip-flops',
                'Handbags',
                'Backpacks',
                'Tote bags',
                'Clutches',
                'Purses & wallets',
                'Makeup bags',
                'Jewelry',
                'Watches',
                'Belts',
                'Sunglasses',
                'Gloves',
                'Hats & caps',
                'Makeup',
                'Perfume',
                'Face care',
                'Pants',
                'Shorts',
                'T-shits',
                'Sneakers',
                'Sport shoes',
            ],
        },
        brand: {
            type: String,
            required: true,
            default: 'unbranded',
        },
        size: {
            type: String,
            required: true,
        },
        condition: {
            type: String,
            required: true,
            enum: ['New with tags', 'Very good', 'Good', 'Satisfactory'],
        },
        price: {
            type: Number,
            required: true,
        },
        currency: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            default: 'white',
        },
        swapping: {
            type: Boolean,
            required: true,
            default: false,
        },
        images: {
            type: [
                {
                    name: {
                        type: String,
                        required: true,
                    },
                    url: {
                        type: String,
                        required: true,
                    },
                },
            ],
            required: true,
        },
        favouriteCount: {
            type: Number,
        },
        owner: {
            type: Schema.Types.ObjectId,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

export default mongoose.model('Product', productSchema)
