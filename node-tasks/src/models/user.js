const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const Task = require('../models/task');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("not valid email");
      }
    }
  },
  age: {
    type: Number
  },
  password: {
    type: String,
    trim: true,
    minlength: 6,
    validate(value) {
      if (value == "password") {
        throw new Error("Unacceptable password");
      }
    }
  },
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ]
}, {
  timestamps: true
});

userSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "owner"
});

// hash password
userSchema.pre("save", async function(next) {
  const user = this;

  if (user.isModified("password")) {
      user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

// delete all tasks before user is removed
userSchema.pre('remove', async function (next) {
  const user = this

  await Task.deleteMany({owner: user._id})

  next();
})

userSchema.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject();
  delete userObject.tokens;
  delete userObject.password;

  return userObject;
};

userSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "secretkey");
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("no such email or pass");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("no such pass or email");
  }

  return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;

