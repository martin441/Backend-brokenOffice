const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");
const { validateUser } = require("../middleware/auth");



router.get("/profile", validateUser, UserController.getProfile)

router.put("/edit/profile", validateUser, UserController.editProfile)

router.put("/edit/password", validateUser, UserController.editPassword)

router.post("/login", UserController.login)

module.exports = router;