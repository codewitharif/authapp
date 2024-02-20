const express = require("express");
const userController = require("../controller/userController");
const router = new express.Router();
const userAuthenticate = require("../middleware/authenticate");

router.post("/register", userController.userRegister);
router.post("/login", userController.Login);
router.get("/validuser", userAuthenticate, userController.ValidUser);
router.get("/logout", userAuthenticate, userController.Logout);

module.exports = router;
