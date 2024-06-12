const User = require("../models/user");
const { generateToken } = require("../lib/token");

const createToken = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      console.log("Auth Error: User not found");
      res.status(401).json({ message: "User not found" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).send("Invalid email or password");
    }

    // else if (user.password !== password) {
    //   console.log("Auth Error: Passwords do not match");
    //   res.status(401).json({ message: "Password incorrect" });
    // }

    const token = generateToken(user.id);
    res.status(201).json({ token: token, userId: user._id, message: "OK" });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const AuthenticationController = {
  createToken: createToken,
};

module.exports = AuthenticationController;
