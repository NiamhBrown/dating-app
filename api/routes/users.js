const express = require("express");
const UsersController = require("../controllers/users");
const upload = require("../middleware/multer");
const tokenChecker = require("../middleware/tokenChecker");

const router = express.Router();

router.post("/", UsersController.create);
router.post("/sendRequest", UsersController.addUsertoRequests);
router.post("/acceptMatch", UsersController.addUsertoMatches);
router.get("/", UsersController.getAllUsers);
router.get("/:userId", UsersController.getOneUser);
router.get("/matches/:userId", UsersController.getMatches);

//router.post("/getOneUser", UsersController.getOneUser)

router.post(
  "/profilePicture",
  tokenChecker,
  upload.single("profilePicture"),
  UsersController.addProfilePicture
);

router.put("/profile", tokenChecker, UsersController.updateUserProfile);
module.exports = router;
