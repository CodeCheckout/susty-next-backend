import Order from '../models/order'

export const getSellerOrders = async (req, res) => {
    const {sellerId} = req.query

    await Order.find({seller: sellerId})
        .then((orders) => {
            return res.status(200).json({
                success: true,
                message: 'Seller orders fetched successfully',
                orders,
            })
        })
        .catch((error) => {
            return res.status(500).json({
                success: false,
                message: 'Failed to fetch seller orders',
                error,
            })
        })
}

export const getBuyerOrders = async (req, res) => {
    const {buyerId} = req.query

    await Order.find({buyer: buyerId})
        .then((orders) => {
            return res.status(200).json({
                success: true,
                message: 'Buyer orders fetched successfully',
                orders,
            })
        })
        .catch((error) => {
            return res.status(500).json({
                success: false,
                message: 'Failed to fetch buyer orders',
                error,
            })
        })
}

// for testing
export const placeOrder = async (req, res) => {
    const {productId, sellerId, buyerId, PayPalLog} = req.body

    const newOrder = new Order({
        productId,
        seller: sellerId,
        buyer: buyerId,
        PayPalLog,
    })

    await Order.create(newOrder)
        .then((order) => {
            return res.status(200).json({
                success: true,
                message: 'Order placed successfully',
                order,
            })
        })
        .catch((error) => {
            return res.status(500).json({
                success: false,
                message: 'Failed to place order',
                error,
            })
        })
}
