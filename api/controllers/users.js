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

const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).json({ users: users });
};

const addUsertoRequests = async (req, res) => {
  console.log("In addUser");
  await User.findByIdAndUpdate(req.body.user_id, { $push: { matchRequests: req.body.sender_id }});
  res.status(201).json({ message: "OK" });
}

const UsersController = {
  create: create,
  getOneUser: getOneUser,
  getAllUsers: getAllUsers,
  addUsertoRequests: addUsertoRequests
};

module.exports = UsersController;
