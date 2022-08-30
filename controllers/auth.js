import User from '../models/user'
import bcrypt from 'bcrypt'
import nodemailer from 'nodemailer'
import crypto from 'crypto'

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

    const user = await User.findOne({email})

    if (user && user != [] && user != undefined && user != null) {
        if (bcrypt.compareSync(password, user.password)) {
            return sendToken(user, 201, res)
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
}

// from the JWT part
export const registerUser = async (req, res) => {
    const {name, image, role, userId, email, address, password} = req.body

    const saltRounds = 10
    const hashPassword = bcrypt.hashSync(password, saltRounds)

    const newUser = new User({
        name,
        image,
        role,
        userId,
        email,
        password: hashPassword,
        address,
    })

    await User.findOne({email: email}).then(async (emailExist) => {
        if (emailExist !== null) {
            return res.status(400).json({
                message: 'Email has taken!',
                success: false,
            })
        } else {
            await User.create(newUser)
                .then((user) => {
                    return sendToken(user, 201, res)
                })
                .catch((error) => {
                    return res.status(500).json({
                        success: false,
                        message: 'Failed to add User!',
                        error,
                    })
                })
        }
    })
}

export const forgotPassword = async (req, res) => {
    const {email} = req.body

    try {
        const user = await User.findOne({email})

        if (!user) {
            return res.status(404).json({
                message: 'No user found',
                success: false,
            })
        }
        const resetToken = user.getResetPasswordToken()
        await user.save()

        const resetUrl = `http://localhost:8000/api/user/resetPassword/${resetToken}`

        const message = `
            <h1>You have requested a password reset </h1>
            <p>Please go to this link to reset your password</p>
            <a href = ${resetUrl} clicktracking=off>${resetUrl} </a>
            <h2 > ${resetToken} </h2>
        `

        try {
            const transporter = nodemailer.createTransport({
                service: process.env.EMAIL_SERVICE,
                auth: {
                    user: process.env.EMAIL_USERNAME,
                    pass: process.env.EMAIL_PASSWORD,
                },
                tls: {
                    rejectUnauthorized: false,
                },
            })

            const mailOptions = {
                from: process.env.EMAIL_FROM,
                to: user.email,
                subject: 'Password Reset',
                html: message,
            }

            transporter.sendMail(mailOptions, function (err, info) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(info)
                }
            })

            res.status(200).json({message: 'Email sent', success: true})
        } catch (error) {
            user.resetPasswordToken = undefined
            user.resetPasswordExpire = undefined

            await user.save()
            return res.status(500).json({
                success: false,
                message: 'Email could not be sent',
            })
        }
    } catch (error) {
        console.log(error)
    }
}

export const verifyResetToken = async (req, res) => {
    const resetPasswordToken = crypto
        .createHash('sha256')
        .update(req.body.resetToken)
        .digest('hex')

    try {
        const user = await User.findOne({
            resetPasswordToken: resetPasswordToken,
            resetPasswordExpire: {$gt: Date.now()},
        })

        if (!user) {
            return res.status(400).json({
                message: 'Invalid Verificaion Token',
                success: false,
            })
        }

        return res.status(200).json({
            message: 'Correct Verification Code',
            success: true,
            userId: user._id,
        })
    } catch (err) {
        console.log(err)
    }
}

export const resetPassword = async (req, res) => {
    const {userId} = req.body

    try {
        const user = await User.findOne({
            _id: userId,
            resetPasswordExpire: {$gt: Date.now()},
        })

        if (!user) {
            return res.status(400).json({message: 'Their is no any user'})
        }

        // hash new password with bcrypt
        const password = req.body.password

        const saltRounds = 10
        const hashPassword = bcrypt.hashSync(password, saltRounds)

        user.password = hashPassword
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined

        await user.save()
        res.status(201).json({
            success: true,
            message: 'Password reset success',
        })
    } catch (err) {
        console.log(err)
    }
}

const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken()
    res.status(statusCode).json({success: true, token, user})
}
