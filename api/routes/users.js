const express = require("express");

const UsersController = require("../controllers/users");

const router = express.Router();

router.post("/", UsersController.create);
router.post("/sendrequest", UsersController.addUsertoRequests);
router.get("/", UsersController.getAllUsers);
router.get("/getOneUser", UsersController.getOneUser)

module.exports = router;
