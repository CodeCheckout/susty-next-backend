import User from '../models/user'
import bcrypt from 'bcrypt'

//add user
export const adduser = async (req, res) => {
    const {name, image, role, userId, email, address, password} = req.body

    const saltRounds = 10
    const hashPassword = bcrypt.hashSync(password, saltRounds)
    console.log(hashPassword)

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

//update user
export const updateUser = async (req, res) => {
    const {userId, name, image, email, address} = req.body
    const upadatedUser = {
        name: name,
        image: image,
        email: email,
        address: address,
    }

    await User.findOne({_id: id})
        .then(async (userExist) => {
            if (userExist === null) {
                return res.status(400).json({
                    message: 'There is no such user',
                })
            }
        })

        .then(async () => {
            await User.findOneAndUpdate({_id: userId}, upadatedUser, {
                new: true,
            })
                .then((user) => {
                    return res.status(200).json({
                        success: true,
                        message: 'User updated successfully!',
                        user,
                    })
                })
                .catch((error) => {
                    return res.status(500).json({
                        success: false,
                        message: 'Failed to update User!',
                        error,
                    })
                })
        })
}

// get user details
export const getUserDetails = async (req, res) => {
    const {userId} = req.query

    await User.findById(userId).then((user) => {
        if (user) {
            return res.status(200).json({
                success: true,
                message: 'User details fetched successfully',
                user,
            })
        } else {
            return res.status(501).json({
                success: false,
                message: 'Failed to fetch user details',
                user,
            })
        }
    })
}

//get user address
export const getUserAddress = async (req, res) => {
    const {id} = req.query

    await User.findOne({_id: id})
        .then(async (userExist) => {
            if (userExist === null) {
                return res.status(400).json({
                    message: 'There is no such user',
                })
            }
        })

        .then(async () => {
            await User.findOne({_id: id})
                .then((user) => {
                    console.log(user.address)
                    return res.status(200).json({
                        success: true,
                        message: 'Address fetched successfully!',
                        address: user.address,
                    })
                })
                .catch((error) => {
                    return res.status(400).json({
                        success: false,
                        message: 'Failed to fetch Address!',
                        error,
                    })
                })
        })
}

// add product
export const addProductToAccount = async (req, res) => {
    const {userId, productId} = req.body

    console.log(req.body)

    await User.findByIdAndUpdate(userId, {$push: {products: productId}})
        .then((updatedItem) => {
            return res.status(200).json({
                success: true,
                message: 'Product added successfully',
                updatedItem,
            })
        })
        .catch((error) => {
            return res.status(500).json({
                success: false,
                message: 'Product added unsuccessfully',
                error,
            })
        })
}

// add mySelling item
export const addMySellings = async (req, res) => {
    const {userId, productId} = req.body

    console.log(req.body)

    await User.findByIdAndUpdate(userId, {$push: {mySellings: productId}})
        .then((updatedItem) => {
            return res.status(200).json({
                success: true,
                message: 'My selling added successfully',
                updatedItem,
            })
        })
        .catch((error) => {
            return res.status(500).json({
                success: false,
                message: 'My selling added unsuccessfully',
                error,
            })
        })
}

// get seller products
export const getSellerProducts = async (req, res) => {
    const {userId} = req.query

    await User.findById({_id: userId})
        .then((userDetails) => {
            if (userDetails == null || userDetails == []) {
                return res.status(500).json({
                    success: false,
                    message: 'There is no such user',
                })
            }
        })
        .then(async () => {
            await User.findOne({_id: userId})
                .then((products) => {
                    if (products.products.length > 0) {
                        return res.status(200).json({
                            success: true,
                            message: 'Seller products fetched',
                            products,
                        })
                    } else {
                        return res.status(201).json({
                            success: false,
                            message: 'Seller has no products',
                            products,
                        })
                    }
                })
                .catch((error) => {
                    return res.status(500).json({
                        success: false,
                        message: 'Failed to fetch seller products',
                        error,
                    })
                })
        })
        .catch((error) => {
            return res.status(500).json({
                success: false,
                message: 'User is not existing',
                error,
            })
        })
}

// remove user  ### ONLY FOR TESTING ###
export const removeUser = async (req, res) => {
    const {userId} = req.body

    await User.deleteOne({_id: userId}).then((userDetails) => {
        return res.status(200).json({
            message: 'delete success',
            user: userDetails,
        })
    })
}

// get all sellers
export const getSellers = async (req, res) => {
    await User.find({'products.0': {$exists: true}}).then((result) => {
        return res.json({
            success: true,
            message: 'Sellers fetched',
            sellers: result,
        })
    })
}

const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken()
    res.status(statusCode).json({success: true, token})
}
