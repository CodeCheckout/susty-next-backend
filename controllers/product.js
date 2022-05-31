import Product from '../models/product'

export const addProduct = async (req, res) => {
    const {
        title,
        description,
        mainCategory,
        subCategory1,
        subCategory2,
        brand,
        size,
        condition,
        price,
        currency,
        swapping,
        images,
        userId,
    } = req.body

    const newProduct = new Product({
        title,
        description,
        mainCategory,
        subCategory1,
        subCategory2,
        brand,
        size,
        condition,
        price,
        currency,
        swapping,
        images,
        favouriteCount: 0,
        owner: userId,
    })

    await Product.create(newProduct)
        .then((product) => {
            return res.status(200).json({
                success: true,
                message: 'Product added successfully!',
                product,
            })
        })
        .catch((error) => {
            return res.status(500).json({
                success: false,
                message: 'Failed to add product!',
                error,
            })
        })
}
