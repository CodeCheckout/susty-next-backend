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

export const fetchProducts = async (req, res) => {
    const {productLimit} = req.query

    await Product.find({})
        .limit(productLimit)
        .then((products) => {
            return res.status(200).json({
                success: true,
                message: 'Products fetched successfully!',
                products,
            })
        })
        .catch((error) => {
            return res.status(500).json({
                success: false,
                message: 'Failed to fetch products!',
                error,
            })
        })
}

export const getSingleProduct = async (req, res) => {
    const {productId} = req.query

    await Product.findById(productId)
        .then((product) => {
            return res.status(200).json({
                success: true,
                message: 'Product fetched successfully!',
                product,
            })
        })
        .catch((error) => {
            return res.status(500).json({
                success: false,
                message: 'Failed to fetch product!',
                error,
            })
        })
}

export const filterProducts = async(req, res) => {
    const {mainCat, subCatOne, subCatTwo, condition} = req.body;

    let items = await Product.find({mainCategory:mainCat})

    if(items){
        let filteredResult = items.filter((item) => {
            return item.subCategory1 == subCatOne;
        })

        filteredResult = filteredResult.filter((item) => {
            return item.subCategory2 == subCatTwo;
        })

        filteredResult = filteredResult.filter((item) => {
            return item.condition == condition;
        })

        return res.status(200).json({
            result : filteredResult
        })
    }
}
