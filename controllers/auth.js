import User from '../models/user'

export const authenticateUser = async (req, res) => {
    const {uid, displayName, photoURL, email} = req.body

    const user = await User.findOne({userId: uid})
    if (user) {
        return res
            .status(200)
            .json({
                message: 'User Details fetched successfully',
                user: user
            })
    }

    const newUser = new User({
        userId: uid,
        name: displayName,
        image: {
            url: photoURL,
            name: 'default_profile_pic.png',
        },
        role: 'customer',
        email: email,
    })

    await User.create(newUser)

    res.status(201).json({
        success: true,
        message: 'User registered successfully',
        user: newUser,
    })
}
