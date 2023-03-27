const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/admin");
const { validateOmega } = require("../middleware/validateOmega");

router.get("/users", validateOmega, AdminController.allUsers);
router.post("/create/user", AdminController.createUser);
router.put("/edit/user", AdminController.editUser);
router.delete("/users", AdminController.deleteUser);

module.exports = router;
