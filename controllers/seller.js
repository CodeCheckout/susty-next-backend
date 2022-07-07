import Seller from '../models/seller'

export const getSellerProducts = async (req, res) => {
    const {sellerId} = req.query

    console.log(req.query)

    await Seller.findById(sellerId)
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
}
