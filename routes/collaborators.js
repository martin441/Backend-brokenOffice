const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/admin");
const { validateOmega } = require("../middleware/validateOmega");
const { validateAlpha } = require("../middleware/validateAlpha");

router.get("/users", validateAlpha, AdminController.allUsers);
router.post("/create/user", validateAlpha, AdminController.createUser);
router.put("/edit/type", validateOmega, AdminController.editUserType);
router.delete("/users", validateAlpha, AdminController.deleteUser);

module.exports = router;
