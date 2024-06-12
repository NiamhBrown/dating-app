const express = require("express");

const UsersController = require("../controllers/users");

const router = express.Router();

router.post("/", UsersController.create);
router.post("/sendRequest", UsersController.addUsertoRequests);
router.post("/acceptMatch", UsersController.addUsertoMatches);
router.get("/", UsersController.getAllUsers);
router.get("/:user_id", UsersController.getOneUser)

router.post("/getOneUser", UsersController.getOneUser)


router.post("/profilePicture", tokenChecker, upload.single("profilePicture"), UsersController.addProfilePicture);

module.exports = router;
