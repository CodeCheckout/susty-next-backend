import User from "../models/user";

//add user
export const adduser = async (req, res) => {
  const { name, image, role, userId, email, address } = req.body;

  const newUser = new User({
    name,
    image,
    role,
    userId,
    email,
    address,
  });
  if (userId != null) {
    return res.status(400).json({
        message: "The user already exists!",
      });
  } else {
    await User.create(newUser)
      .then((user) => {
        return res.status(200).json({
          success: true,
          message: "User added successfully!",
          user,
        });
      })
      .catch((error) => {
        return res.status(500).json({
          success: false,
          message: "Failed to add User!",
          error,
        });
      });
  }
};

//update user
export const updateUser = async (req, res) => {
  const { userId, name, image, email, address } = req.body;
  const upadatedUser = {
    name: name,
    image: image,
    email: email,
    address: address,
  };
  if (_id === null) {
    return res.status(400).json({
      message: "There is no such user",
    });
  } else {
    await User.findOneAndUpdate({ _id: userId }, upadatedUser, { new: true })
      .then((user) => {
        return res.status(200).json({
          success: true,
          message: "User updated successfully!",
          user,
        });
      })
      .catch((error) => {
        return res.status(500).json({
          success: false,
          message: "Failed to update User!",
          error,
        });
      });
  }
};

//get user address
export const getUserAddress = async (req, res) => {
  const { id } = req.query;

  await User.findOne({ _id: id })
    .then((user) => {
      if (id === null) {
        return res.status(400).json({
          message: "There is no such user",
        });
      } else {
        console.log(user.address);
        return res.status(200).json({
          success: true,
          message: "Address fetched successfully!",
          address: user.address,
        });
      }
    })
    .catch((error) => {
      return res.status(400).json({
        success: false,
        message: "Failed to fetch Address!",
        error,
      });
    });
};
