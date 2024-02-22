const bcrypt = require("bcryptjs");
const userdb = require("../models/userSchema");

exports.userRegister = async (req, res) => {
  console.log(req.body);
  const { fname, email, password, cpassword } = req.body;

  console.log(fname, email, password, cpassword);

  if (!fname || !email || !password || !cpassword) {
    res.status(400).json({ error: "all fields are required" });
  }

  try {
    const preuser = await userdb.findOne({ email: email });

    if (preuser) {
      res.status(400).json({ error: "this email already exist" });
    } else if (password !== cpassword) {
      res
        .status(400)
        .json({ error: "password and confirm password does not match" });
    } else {
      const userData = new userdb({
        fname,
        email,
        password,
        cpassword,
      });

      await userData.save();
      res.status(201).json({ status: 201, userData });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

//login controller
exports.Login = async (req, res) => {
  const { email, password } = req.body;
  //console.log("Request Body:", req.body);

  if (!email || !password) {
    return res.status(400).json({ error: "all fields are required" });
  }

  try {
    const userValid = await userdb.findOne({ email: email });

    if (userValid) {
      const isMatch = await bcrypt.compare(password, userValid.password);

      if (!isMatch) {
        return res.status(400).json({ error: "Invalid Details h" });
      } else {
        //token generate
        const token = await userValid.generateuserAuthToken();
        console.log("Generated Token:", token);

        res.cookie("usercookie", token, {
          expires: new Date(Date.now() + 9000000),
          httpOnly: true,
        });

        console.log("Cookie set successfully");

        const result = {
          userValid,
          token,
        };

        return res.status(200).json({ status: 200, result });
      }
    } else {
      //console.log("Invalid Details");
      return res.status(400).json({ error: "Invalid Details" });
    }
  } catch (error) {
    return res.status(400).json(error);
  }
};

exports.ValidUser = async (req, res) => {
  try {
    const ValidUserOne = await userdb.findOne({ _id: req.userId });
    res.status(200).json({ status: 200, ValidUserOne });
  } catch (error) {
    return res.status(401).json({ status: 401, error });
  }
};

exports.Logout = async (req, res) => {
  try {
    req.rootUser.tokens = req.rootUser.tokens.filter((currentElement) => {
      return currentElement.token !== req.token;
    });
    res.clearCookie("usercookie", { path: "/" });
    await req.rootUser.save();
    res.status(200).json({ status: 200 });
  } catch (error) {
    return res.status(401).json({ status: 401, error });
  }
};
