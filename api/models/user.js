const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  techStack: {
    type: [String],
    default: [],
  },
  url: {
    type: String,
    default: "",
  },
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  forename: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    default: null,
  },
  proficiencyLevel: {
    type: String,
    enum: ["unspecified", "beginner", "junior", "intermediate", "senior"],
    default: "unspecified",
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "non-binary", "prefer not to say"],
    default: "prefer not to say",
  },
  location: {
    type: String,
    default: "",
  },
  lookingFor: {
    proficiencyLevel: {
      type: [String],
      default: [],
    },
    techStack: {
      type: [String],
      default: [],
    },
    projectType: {
      type: [String],
      default: [],
    },
  },
  projects: [projectSchema],
  // projects: {
  //   title: {
  //     type: String,
  //     default: "",
  //   },
  //   description: {
  //     type: String,
  //     default: "",
  //   },
  //   techStack: {
  //     type: [String],
  //     default: [],
  //   },
  //   url: {
  //     type: String,
  //     default: "",
  //   },
  // },
  techStack: {
    type: [String],
    default: [],
  },
  job: {
    type: String,
    default: "",
  },
  bio: {
    type: String,
    default: "",
  },
  url: {
    type: String,
    default: "",
  },
  matches: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    default: [],
  },
  matchRequests: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    default: [],
  },
  blackList: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    default: [],
  },
});


const capitalize = (str) => {
  return str.replace(/\b\w/g, char => char.toUpperCase());
};

userSchema.pre("save", async function (next) {

  // Capitalize names
  if (this.isModified("forename")) {
    this.forename = capitalize(this.forename);
  }
  if (this.isModified("lastName")) {
    this.lastName = capitalize(this.lastName);
  }

  // Hash password if it's modified
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
