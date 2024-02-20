const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "arifaheretheinnovativeengineer";

//user schema
const userSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("not valid email");
        }
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

//password hashing
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

// //token generate
userSchema.methods.generateuserAuthToken = async function () {
  try {
    let newtoken = jwt.sign({ _id: this._id }, SECRET_KEY, {
      expiresIn: "1d",
    });
    this.tokens = this.tokens.concat({ token: newtoken });
    console.log(newtoken);
    await this.save();
    return newtoken;
  } catch (error) {
    console.error(error);
    throw new Error("Token generation failed");
  }
};

const userdb = new mongoose.model("users", userSchema);
module.exports = userdb;
