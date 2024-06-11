const mongoose = require("mongoose");

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
    enum: ["beginner", "junior", "intermediate", "senior"],
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
    proficiency: {
      type: String,
      enum: ["beginner", "junior", "intermediate", "senior", "unspecified"],
      default: "unspecified",
    },
    techStack: {
      type: [String],
      default: [],
    },
  },
  experience: {
    type: String,
    default: "",
  },
  projects: {
    type: [String],
    default: [],
  },
  languages: {
    type: [String],
    default: [],
  },
  technologies: {
    type: [String],
    default: [],
  },
  projectType: {
    type: String,
    default: "",
  },
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

const User = mongoose.model("User", userSchema);

module.exports = User;
