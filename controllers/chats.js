const ChatServices = require("../services/chats");
const UserServices = require("../services/user");

class ChatsController {
    static async createChat(req, res, next) {
      try {
        const {room} = req.body
        const { error, data } = await ChatServices.createNewChat(room);
        if (error) return res.status(404).send(data);
        res.status(201).send("Room created successfully");
      } catch (error) {
        res.status(404).send(error);
      }
    }
    static async addMessages(req, res, next) {
        try{
            const email = req.user.email
            const {msg, room} = req.body
            const user = await UserServices.findOneByEmail(email)
            if (user.error) return res.status(404).send(user.data);
            const userId = user.data._id;
            const newMessage = await ChatServices.addMessages(msg, room, userId)
            if (newMessage.error) return res.status(404).send(newMessage.data);
            res.status(201).send(newMessage.data)
        } catch(error){
            res.status(404).send(error);
        }
    }
    static async messageHistory(req,res,next) {
        try{
            const chatId = req.params;
            const chatHistory = ChatServices.getChatHistory(chatId)
            if (chatHistory.error) return res.status(404).send(chatHistory.data);
            res.status(200).send(chatHistory.data)
        } catch(error){
            res.status(404).send(error);
        }
    }

}

module.exports = ChatsController