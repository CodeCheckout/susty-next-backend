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

export const filterProducts = async (req, res) => {
    const {
        mainCat,
        subCatOne,
        subCatTwo,
        condition,
        color,
        brand,
        size,
        priceFrom,
        priceTo,
        swapping,
        sortBy,
    } = req.query

    let items = await Product.find({mainCategory: mainCat})
    let filteredResult = items
    if (items) {
        if (subCatOne) {
            filteredResult = filteredResult.filter((item) => {
                return item.subCategory1 == subCatOne
            })
        }

        if (subCatTwo) {
            filteredResult = filteredResult.filter((item) => {
                return item.subCategory2 == subCatTwo
            })
        }

        if (condition) {
            filteredResult = filteredResult.filter((item) => {
                return item.condition == condition
            })
        }

        if (size) {
            filteredResult = filteredResult.filter((item) => {
                return item.size == size
            })
        }

        if (color) {
            filteredResult = filteredResult.filter((item) => {
                return item.color == color
            })
        }

        if (brand) {
            filteredResult = filteredResult.filter((item) => {
                return item.brand == brand
            })
        }

        if (priceFrom || priceTo) {
            if (priceFrom && priceTo) {
                filteredResult = filteredResult.filter((item) => {
                    return item.price >= priceFrom && item.price <= priceTo
                })
            } else if (priceFrom) {
                filteredResult = filteredResult.filter((item) => {
                    return item.price >= priceFrom
                })
            } else if (priceTo) {
                filteredResult = filteredResult.filter((item) => {
                    return item.price <= priceTo
                })
            }
        }

        if (swapping == 'true' || swapping == 'false') {
            if (swapping === 'true') {
                filteredResult = filteredResult.filter((item) => {
                    return item.swapping === true
                })
            }
            if (swapping === 'false') {
                filteredResult = filteredResult.filter((item) => {
                    return item.swapping === false
                })
            }
        }

        // implement sortBy

        return res.status(200).json({
            result: filteredResult,
        })
    }
}
