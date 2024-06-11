const User = require("../models/user");

const create = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = new User({ email, password });
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

const UsersController = {
  create: create,
  getOneUser: getOneUser
};

module.exports = UsersController;
