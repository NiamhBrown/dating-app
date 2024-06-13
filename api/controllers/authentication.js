const User = require("../models/user");
const { generateToken } = require("../lib/token");

const createToken = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      console.log("Auth Error: User not found");
      return res.status(401).json({ message: "User not found" });
    }
    if (user.password !== password) {
      console.log("Auth Error: Passwords do not match");
      return res.status(401).json({ message: "Password incorrect" });
    }
    const token = generateToken(user.id);
    res.status(201).json({ token: token, userId: user._id, message: "OK" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const AuthenticationController = {
  createToken: createToken,
};

module.exports = AuthenticationController;
