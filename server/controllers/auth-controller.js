const User = require("../models/user-model");
const bcrypt = require("bcrypt");

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

    return res.status(201).json({
      msg: "Registration Successful",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    }); // Return here to exit the function
  } catch (error) {
    // console.log(error); // Log the error for debugging
    // return res.status(500).json("Internal Server Error");
    next(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //Email valid or not (db main exists krte yah nhi)
    const userExist = await User.findOne({ email });
    console.log(" User is " + userExist);
    if (!userExist) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    //compare password (one way of doing this)
    // const isPasswordValid = await bcrypt.compare(password, userExist.password);
    const isPasswordValid = await userExist.comparePassword(password);
    if (isPasswordValid) {
      return res.status(200).json({
        msg: "Login Successful",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    return res.status(500).json("Internal Server Error");
  }
};
module.exports = { home, register, login };
