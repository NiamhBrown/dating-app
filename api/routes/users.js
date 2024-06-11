const express = require("express");

const UsersController = require("../controllers/users");

const router = express.Router();

router.post("/", UsersController.create);
router.post("/getOneUser", UsersController.getOneUser)

module.exports = router;
