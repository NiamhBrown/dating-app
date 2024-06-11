const User = require("../models/user");

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
      res.status(400).json({ message: "Something went wrong" });
    });
};
const getOneUser = async (req, res) => {
  const user = await User.find({_id:req.user_id});
  const token = generateToken(req.user_id);
  res.status(200).json({ user: user, token: token });
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
}

const UsersController = {
  create: create,
  getOneUser: getOneUser,
  addProfilePicture: addProfilePicture
};

module.exports = UsersController;
