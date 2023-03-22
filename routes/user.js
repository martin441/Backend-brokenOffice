const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user")

router.get("/profile", UserController.getProfile)

router.put("/edit/profile", UserController.editProfile)

router.put("/edit/password", UserController.editPassword)

module.exports = router;