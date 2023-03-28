const express = require("express");
const router = express.Router();
const CollaboratorsController = require("../controllers/collaborators");
const { validateAlpha, validateOmega} = require("../middleware");


router.get("/users", validateAlpha, CollaboratorsController.allUsers);
router.post("/create/user", validateAlpha, CollaboratorsController.createUser);
router.put("/edit/type", validateOmega, CollaboratorsController.editUserType);
router.delete("/delete/:userEmail", validateAlpha, CollaboratorsController.deleteUser);

module.exports = router;
