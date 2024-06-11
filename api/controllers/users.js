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
  const user = await User.findById(req.params.user_id);
  // const token = generateToken(req.params.user_id);
  res.status(200).json({ user: user });
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
  getAllUsers: getAllUsers,
  addUsertoRequests: addUsertoRequests,
  addUsertoMatches: addUsertoMatches
};

module.exports = UsersController;
