const User = require("../models/user");
const { generateToken } = require("../lib/token");
const chatController = require("./chats")

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
  const user = await User.findById(req.params.userId);
  const token = generateToken(req.params.userId);
  res.status(200).json({ user: user , token: token });
};

const addProfilePicture = async (req, res) => {
  try {
    console.log("userId",userId)
    const user = await User.findById({_id:req.userId });
    console.log("user",user)
    user.profilePicture = "/uploads/" + req.file.filename;
    await user.save();
    res
      .status(200)
      .json({
        message: "Profile picture updated",
        profilePicture: user.profilePicture,
      });
  } catch (error) {
    res.status(500).json({ message: "Error uploading profile picture" });
  }
};

const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).json({ users: users });
};

const getMatches = async (req, res) => {
  const users = await User.find();
  const currentUser = await User.findById({_id:req.params.userId })
  const matches = users.filter((user) =>{
    return (
      user &&
      currentUser.matches.includes(user._id))})

  res.status(200).json({ users: matches });
};

const addUsertoRequests = async (req, res) => {
  const recipient = req.body.recipient;
  const sender = req.body.sender;
  await User.findByIdAndUpdate(recipient, { $push: { matchRequests: sender } });
  res.status(201).json({ message: "OK" });
};

const addUsertoMatches = async (req, res) => {
  const recipient = req.body.recipient;
  const sender = req.body.sender;
  await User.findByIdAndUpdate(recipient, { $push: { matches: sender } });
  await User.findByIdAndUpdate(sender, {
    $push: { matches: recipient },
    $pull: { matchRequests: recipient },
  });
  res.status(201).json({ message: "OK" });
};

// Controller to update user profile
const updateUserProfile = async (req, res) => {
  try {
    const userId = req.userId; // Assuming user ID is available in the request object (e.g., from authentication middleware)
    const updateData = req.body;

    // Find user by ID and update
    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const UsersController = {
  create: create,
  getOneUser: getOneUser,
  addProfilePicture: addProfilePicture,
  getAllUsers: getAllUsers,
  addUsertoRequests: addUsertoRequests,
  addUsertoMatches: addUsertoMatches,
  getMatches: getMatches,
  updateUserProfile: updateUserProfile,
};

module.exports = UsersController;
