import Seller from '../models/seller'
import User from '../models/user'

export const getSellerProducts = async (req, res) => {
    const {userId} = req.query

    console.log(userId)

    await User.findById({_id: userId})
        .then((user) => {
            if (user == null || user == []) {
                return res.status(500).json({
                    success: false,
                    message: 'Their is no such user',
                    user,
                })
            }
        })
        .then(async () => {
            await Seller.find({userId: userId})
                .then((products) => {
                    return res.status(200).json({
                        success: true,
                        message: 'Seller products fetched',
                        products,
                    })
                })
                .catch((error) => {
                    return res.status(500).json({
                        success: false,
                        message: 'Failed to fetch seller products',
                        error,
                    })
                })
        })
        .catch((error) => {
            return res.status(500).json({
                message: 'User is not existing',
                error,
            })
        })
}

// this one or
export const addProducts = async (req, res) => {
    const {userId, productId, address} = req.body

    console.log(req.body)

    const newSellerItem = new Seller({
        products: productId,
        userId,
        address,
    })

    await Seller.create(newSellerItem)
        .then((item) => {
            return res.status(200).json({
                success: true,
                message: 'Product added successfully',
                item,
            })
        })
        .catch((err) => {
            return res.status(500).json({
                success: false,
                message: 'Failed to add product',
                err,
            })
        })
}

// this one
export const addProductAsSeller = async (req, res) => {
    const {userId, productId, address} = req.body

    console.log(req.body)

    const newSellerItem = new Seller({
        productId,
        userId,
        address,
    })

    await Seller.findOneAndUpdate(
        {userId: userId},
        {$push: {products: productId}}
    )
        .then((updatedItem) => {
            return res.status(200).json({
                success: true,
                message: 'Product added successfully',
                updatedItem,
            })
        })
        .catch((error) => {
            return res.status(500).json({
                success: false,
                message: 'Product added unsuccessfully',
                error,
            })
        })
}

// add mySelling item
export const addMySellings = async (req, res) => {
    const {userId, productId} = req.body

    console.log(req.body)

    await Seller.findOneAndUpdate(
        {userId: userId},
        {$push: {mySellings: productId}}
    )
        .then((updatedItem) => {
            return res.status(200).json({
                success: true,
                message: 'My selling added successfully',
                updatedItem,
            })
        })
        .catch((error) => {
            return res.status(500).json({
                success: false,
                message: 'My selling added unsuccessfully',
                error,
            })
        })
}
