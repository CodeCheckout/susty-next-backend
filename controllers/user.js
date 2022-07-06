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
};

//update user name
export const updateUserName = async (req, res) => {
  const { address } = req.body;

  const newAddress = new User({
    address,
  });

  await User.updateOne(newAddress)
    .then((address) => {
      return res.status(200).json({
        success: true,
        message: "Username updated successfully!",
        address,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        success: false,
        message: "Failed to update Username!",
        error,
      });
    });
};

//update user roles
export const updateUserRole = async (req, res) => {
  const { id } = req.params.id;
  const upadate = req.body;
  const options = { new: true };

  await User.findByIdAndUpdate(id, upadate, options)
    .then((address) => {
      return res.status(200).json({
        success: true,
        message: "Userrole updated successfully!",
        address,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        success: false,
        message: "Failed to update UserRole!",
        error,
      });
    });
};

//update user address
export const updateUserAddress = async (req, res) => {};

//get user address
export const getUserAddress = async (req, res) => {
  const { id } = req.query;

  await User.findById(id)
    .then((user) => {
      console.log(user.email);
      return res.status(200).json({
        success: true,
        message: "Address fetched successfully!",
      });
    })
    .catch((error) => {
      return res.status(400).json({
        success: false,
        message: "Failed to fetch Address!",
      });
    });
};
