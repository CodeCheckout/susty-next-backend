import User from '../models/user'

//update user name
export const updateUserName = async (req, res) => {
    const {
        address,
    } = req.body

    const newAddress = new User({
        address,
    })

    await User.updateOne(newAddress)
        .then((product) => {
            return res.status(200).json({
                success: true,
                message: 'Username updated successfully!',
                product,
            })
        })
        .catch((error) => {
            return res.status(500).json({
                success: false,
                message: 'Failed to update Username!',
                error,
            })
        })
}

//update user roles
export const updateUserRole = async (req, res) => {
 
}

//update user address
export const updateUserAddress = async (req, res) => {
 
}


export const getUserAddress = async (req, res) => {
    const {address} = req.query

    await User.findById(address)
        .then((user) => {
            return res.status(200).json({
                success: true,
                message: 'Address fetched successfully',
                user,
            })
        })
        .catch((error) => {
            return res.status(400).json({
                success: false,
                message: 'Failed to fetch Address!',
            })
        })
}

export const setUserAddress = async (req, res) => {
    const {address} = req.query

    await User.findById(address)
        .then((user) => {
            return res.status(200).json({
                success: true,
                message: 'Profile Details fetched successfully',
                user,
            })
        })
        .catch((error) => {
            return res.status(400).json({
                success: false,
                message: 'Failed to fetch profile details!',
            })
        })
}