const User = require("../models/user-model");

const home = async (req, res) => {
  try {
    res.status(200).send("Welcome to MERN Project using controller");
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
  }
};

const register = async (req, res) => {
  try {

    const { username, email, phone, password } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ msg: "Email Already Registered" }); // Return here to exit the function
    }
    const userCreated = await User.create({
      username,
      email,
      phone,
      password,
    });

    return res.status(200).json({ msg: userCreated }); // Return here to exit the function
  } catch (error) {
    console.log(error); // Log the error for debugging
    return res.status(500).json("Internal Server Error");
  }
};

module.exports = { home, register };
