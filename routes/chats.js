const express = require("express");
const router = express.Router();
const ChatsController = require("../controllers/chats");

router.get("/history/:chatId", ChatsController.messageHistory);
router.post("/create", ChatsController.createChat);
router.post("/messages", ChatsController.addMessages);

module.exports = router;
