import Favourites from "../models/favourites";

export const addFavouritesProducts = async (req, res) => {
    const {userId, favouriteProductList} = req.body;

    await Favourites.create({userId, favouriteProductList})
        .then((favourites) => {
            return res.status(200).JSON({
                success: true,
                message: 'Added into Favourite List Successfully',
                favourites,
            })
        })
        .catch((error) => {
            return res.status(400).JSON({
                success: false,
                message: 'Failed to add favourites',
                error
            })
        })
}

export const getFavouritesProducts = async (req, res) => {
    const {userId} = req.query

    await Favourites.find({})
        .then((favourites) => {
            return res.status(200).JSON({
                success: true,
                message: 'Favourites fetched successfully',
                favourites,
            })
        })
        .catch((error) => {
            return res.status(400).JSON({
                success: false,
                message: 'Failed to fetch favourites',
                error,
            })
        })
}