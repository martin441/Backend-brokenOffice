const express = require("express");
const ChatsController = require("../controllers/chats");
const router = express.Router();


router.post("/create", ChatsController.createChat);
router.post("/messages", ChatsController.addMessages);
router.get("/history", ChatsController.messageHistory);


module.exports = router;
