import User from '../models/user'

export const getProfileDetails = async (req, res) => {
    const {userId} = req.query

    await User.findById(userId)
        .then((user) => {
            return res.status(200).json({
                success:true,
                message: 'Profile Details fetched successfully',
                user,
            })
        })
        .catch((error) => {
            return res.status(500).json({
                success:false,
                message: 'Failed to fetch profile details!'
            })
        })
}