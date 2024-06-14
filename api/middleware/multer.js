const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("Multer file here!!", file);
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, req.userId);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
