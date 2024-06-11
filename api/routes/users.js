const express = require("express");

const UsersController = require("../controllers/users");

const router = express.Router();

router.post("/", UsersController.create);
router.get("/getOneUser", UsersController.getOneUser)

router.post("/profilePicture", tokenChecker, upload.single("profilePicture"), UsersController.addProfilePicture);

module.exports = router;
