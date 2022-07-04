import Favourites from '../models/favourites'
import User from '../models/user'
import Product from '../models/product'
import {checkIfBSONType} from './checkers'

export const addFavouritesProducts = async (req, res) => {
    const {userId, productId} = req.body

    if (!checkIfBSONType(userId) || !checkIfBSONType(productId)) {
        return res.status(403).json({
            message: 'Unauthorized',
        })
    } else if (userId === null) {
        return res.status(400).json({
            message: 'Please Login and Try again',
        })
    } else if (productId === null) {
        return res.status(400).json({
            message:
                'Please check the product that you tried to add into favourite',
        })
    } else
        await User.findOne({_id: userId})
            .then(async (userExist) => {
                if (userExist === null) {
                    return res.status(400).json({
                        message: 'There is no such user',
                    })
                }
            })
            .then(async () => {
                await Product.findOne({_id: productId})
                    .then(async (productExist) => {
                        if (productExist === null) {
                            return res.status(400).json({
                                message: 'There is no such product',
                            })
                        }
                    })
                    .then(async () => {
                        await Favourites.findOne({userId: userId})
                            .then(async (favourites) => {
                                if (favourites === null) {
                                    await Favourites.create({
                                        userId: userId,
                                        favouriteProductList: [productId],
                                    })
                                        .then((newFavourites) => {
                                            return res.status(200).json({
                                                message:
                                                    'Created a favourite list for the user and added the product ID',
                                                new: true,
                                            })
                                        })
                                        .catch((error) => {
                                            return res.status(500).json({
                                                message: 'Database Error',
                                            })
                                        })
                                } else {
                                    if (
                                        favourites.favouriteProductList.includes(
                                            productId
                                        )
                                    ) {
                                        return res.status(400).json({
                                            message:
                                                "You can't add same product twice into the favourite",
                                        })
                                    } else {
                                        await Favourites.updateOne(
                                            {userId: userId},
                                            {
                                                $push: {
                                                    favouriteProductList:
                                                        productId,
                                                },
                                            }
                                        )
                                            .then((newFavorite) => {
                                                return res.status(200).json({
                                                    message:
                                                        'Added new favourite product into the favourite product list',
                                                })
                                            })
                                            .catch((err) => {
                                                return res.status(500).json({
                                                    message: 'Database Error',
                                                })
                                            })
                                    }
                                }
                            })
                            .catch((err) => {
                                return res.status(500).json({
                                    message: 'Database Error',
                                })
                            })
                    })
            })
}

export const getFavouritesProducts = async (req, res) => {
    const {userId} = req.query

    await Favourites.findOne({userId: userId})
        .then((favourites) => {
            if (favourites.favouriteProductList.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Favourites list is empty',
                })
            } else {
                return res.status(200).json({
                    success: true,
                    message: 'Favourites fetched successfully',
                    favourites: favourites.favouriteProductList,
                })
            }
        })
        .catch((error) => {
            return res.status(500).json({
                success: false,
                message: 'Failed to fetch favourites',
                error,
            })
        })
}

export const removeFavourites = async (req, res) => {
    const {userId, productId} = req.body

    await Favourites.findOne({userId: userId})
        .then(async (favourites) => {
            if (favourites.favouriteProductList.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'No favourites yet',
                })
            } else {
                return favourites
            }
        })
        .then(async (favourite) => {
            if (favourite.favouriteProductList.includes(productId)) {
                const newFavourites = favourite.favouriteProductList.filter(
                    (id) => {
                        return id !== productId
                    }
                )
                await Favourites.findOneAndUpdate(
                    {userId: userId},
                    {
                        favouriteProductList: newFavourites,
                    },
                    {new: true}
                )
                    .then(() => {
                        return res.status(200).json({
                            success: true,
                            message: 'Removed favourite successfully',
                            newFavourites,
                        })
                    })
                    .catch((error) => {
                        return res.status(400).json({
                            success: false,
                            message: 'New favourite Update failed',
                            error,
                        })
                    })
            } else {
                return res.status(400).json({
                    success: false,
                    message: 'There is no such favourite you liked',
                })
            }
        })
        .catch((error) => {
            return res.status(400).json({
                success: false,
                message: 'Failed to fetch favourites',
                error,
            })
        })
}
