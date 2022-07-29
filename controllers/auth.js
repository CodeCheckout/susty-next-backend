import User from '../models/user'
import bcrypt from 'bcrypt'

export const authenticateUser = async (req, res) => {
    const {uid, displayName, photoURL, email, address} = req.body

    const user = await User.findOne({userId: uid})
    if (user) {
        return res.status(200).json({
            message: 'User Details fetched successfully',
            user: user,
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
        address: address,
    })

    await User.create(newUser)

    res.status(201).json({
        success: true,
        message: 'User registered successfully',
        user: newUser,
    })
}

export const emailSignIn = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.findOne({email})

        if (user && user != [] && user != undefined && user != null) {
            if (bcrypt.compareSync(password, user.password)) {
                return res.status(201).json({
                    success: true,
                    message: 'User Logged in successfully',
                    user: user,
                })
            } else {
                return res.status(500).json({
                    success: false,
                    message: 'Incorrect password',
                })
            }
        } else {
            return res.status(500).json({
                success: false,
                message: 'Email is not valid',
            })
        }
    } catch (err) {
        console.log(err)
        res.json({
            message: 'User is not registered',
        })
    }
}
