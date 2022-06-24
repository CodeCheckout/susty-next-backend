import User from '../models/user'

export const getProfileDetails = async (req, res) => {
    const {id} = req.query

    await User.findById(id)
        .then((user) => {
            return res.status(200).json({
                success:true,
                message: 'Profile Details fetched successfully',
                user,
            })
        })
        .catch((error) => {
            return res.status(400).json({
                success:false,
                message: 'Failed to fetch profile details!'
            })
        })
}