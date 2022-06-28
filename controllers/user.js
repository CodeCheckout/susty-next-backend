import User from '../models/user'

export const updateusername = async (req, res) => {
 
}

export const updateuserrole = async (req, res) => {
 
}

export const updateuseraddress = async (req, res) => {
 
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