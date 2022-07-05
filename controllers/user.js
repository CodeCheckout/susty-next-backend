import User from "../models/user";

//update user name
export const updateUserName = async (req, res) => {
  const { address } = req.body;

  const newAddress = new User({
    address,
  });

  await User.updateOne(newAddress)
    .then((product) => {
      return res.status(200).json({
        success: true,
        message: "Username updated successfully!",
        product,
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

};

//update user address
export const updateUserAddress = async (req, res) => {
    
};


//get user address
export const getUserAddress = async (req, res) => {
  const { id } = req.query;

  await User.findById(id)
    .then((address) => {
      return res.status(200).json({
        success: true,
        message: "Address fetched successfully!",
        address,
      });
    })
    .catch((error) => {
      return res.status(400).json({
        success: false,
        message: "Failed to fetch Address!",
      });
    });
};


