const express = require("express");
const router = express.Router();
const ChatsController = require("../controllers/chats");

router.get("/history/:chatId", ChatsController.messageHistory);
router.post("/create", ChatsController.createChat);
router.post("/messages", ChatsController.addMessages);
router.post("/issuerlength", ChatsController.recordIssuerLength)
router.post("/solverlength", ChatsController.recordSolverLength)
router.get("/checkissuerlength/:chatRoom", ChatsController.checkIssuerLength)
router.get("/checksolverlength/:chatRoom", ChatsController.checkSolverLength)


module.exports = router;
