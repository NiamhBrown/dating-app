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
      res.status(400).json({ message: "Something went wrong" });
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

const UsersController = {
  create: create,
  getOneUser: getOneUser
};

module.exports = UsersController;
