const ChatServices = require("../services/chats");
const UserServices = require("../services/user");

class ChatsController {
    static async createChat(req, res, next) {
      try {
        const {room} = req.body
        const { error, data } = await ChatServices.createNewChat(room);
        if (error) return res.status(404).send(data);
        res.status(201).send(data);
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
            const email = req.user.email
            const {chatId} = req.params;
            // const {issuer} = req.query;
            // const {solver} = req.query;
            const user = await UserServices.findOneByEmail(email)
            if (user.error) return res.status(404).send(user.data);
            // if (user.data._id !== issuer || user.data._id !== solver) {
            //     return res.status(401).send("Invalid credentials")
            // }
            const chatHistory = await ChatServices.getChatHistory(chatId)
            if (chatHistory.error) return res.status(404).send(chatHistory.data);
            res.status(200).send(chatHistory.data.allMessages)
        } catch(error){
            res.status(404).send(error);
        }
    }

    static async recordIssuerLength(req,res,next) {
        try{
            const email = req.user.email
            const {chatLength, chatId} = req.body
            const updatedUser = await ChatServices.recordIssuerLength(email, chatLength, chatId)
            res.status(200).send(updatedUser.data)
        } catch(error){
            res.status(404).send(error);
        }
    }

    static async recordSolverLength(req,res,next) {
        try{
            const email = req.user.email
            const {chatLength, chatId} = req.body
            const updatedUser = await ChatServices.recordSolverLength(email, chatLength, chatId)
            res.status(200).send(updatedUser)
        } catch(error){
            res.status(404).send(error);
        }
    }

    static async checkIssuerLength(req,res,next) {
        try{
            const email = req.user.email
            const {chatRoom} = req.params
            const chatLength = await ChatServices.getChatLength(chatRoom);
            console.log("chatLength", chatLength)
            if (chatLength.error) return res.status(404).send(chatLength.data);            
            const user = await UserServices.findOneByEmail(email)
            if (user.error) return res.status(404).send(user.data);
            const issuerLength = user.data.issuerMessages.find((chat) => chat.room === chatRoom).chatLength
            const notifications = (chatLength-issuerLength).toString()
            res.status(200).send(notifications)
        } catch(error){
            res.status(404).send(error);
        }
    }

    static async checkSolverLength(req,res,next) {
        try{
            const email = req.user.email
            const {chatRoom} = req.params
            const chatLength = await ChatServices.getChatLength(chatRoom);
            if (chatLength.error) return res.status(404).send(chatLength.data);          
            const user = await UserServices.findOneByEmail(email)
            if (user.error) return res.status(404).send(user.data);
            const solverLength = user.data.solverMessages.find((chat) => chat.room === chatRoom).chatLength
            const notifications = (chatLength-solverLength).toString()
            res.status(200).send(notifications)
        } catch(error){
            res.status(404).send(error);
        }
    }


}

module.exports = ChatsController