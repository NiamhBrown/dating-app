const User = require("../models/user");
const { generateToken } = require("../lib/token");

const create = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;
  const forename = req.body.forename;
  const lastName = req.body.lastName;
  const proficiencyLevel = req.body.proficiencyLevel;
  const age = req.body.age;

  const user = new User({
    email,
    password,
    username,
    forename,
    lastName,
    proficiencyLevel,
    age,
  });
  user
    .save()
    .then((user) => {
      console.log("User created, id:", user._id.toString());
      res.status(201).json({ message: "OK" });
    })
    .catch((err) => {
      console.error(err);
      if (err.code === 11000) {
        if (err.message.includes("email")) {
          res.status(409).json({ message: "Email already exists" });
        } else {
          res.status(409).json({ message: "Username already exists" });
        }
      } else {
        res.status(400).json({ message: "Something went wrong" });
      }
    });
};
const getOneUser = async (req, res) => {

  try {
    const { userId } = req.body; 
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await User.findById(userId); 
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = generateToken(user._id.toString());
    res.status(200).json({ user, token });
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ message: "Something went wrong" });
  }

};


const addProfilePicture = async (req, res) => {
  try {
    const user = await User.findById({_id:req.user_id});
    user.profilePicture = "/uploads/" + req.file.filename;
    await user.save();
    res.status(200).json({message: "Profile picture updated", profilePicture: user.profilePicture });
  } catch (error) {
    res.status(500).json({ message: "Error uploading profile picture" });
  };

const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).json({ users: users });
};

const addUsertoRequests = async (req, res) => {
  const recipient = req.body.recipient;
  const sender = req.body.sender;
  await User.findByIdAndUpdate(recipient, { $push: { matchRequests: sender }});
  res.status(201).json({ message: "OK" });
}

const addUsertoMatches = async (req, res) => {
  const recipient = req.body.recipient;
  const sender = req.body.sender;
  await User.findByIdAndUpdate(recipient, { $push: { matches: sender }});
  await User.findByIdAndUpdate(sender, { $push: { matches: recipient }, $pull: { matchRequests: recipient }});
  res.status(201).json({ message: "OK" });
}

const UsersController = {
  create: create,
  getOneUser: getOneUser,
  addProfilePicture: addProfilePicture,
  getAllUsers: getAllUsers,
  addUsertoRequests: addUsertoRequests,
  addUsertoMatches: addUsertoMatches
};

module.exports = UsersController;
