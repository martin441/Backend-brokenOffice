const { Chat, Message } = require("../models");
const UserServices = require("./user");

class ChatServices {
  static async createNewChat(room) {
    try {
      const existingChat = await Chat.findOne({ room });
      if (existingChat.room) {
        return { error: false, data: "Chat already exists" };
      }
      const newChat = await Chat.create({ room });
      return { error: false, data: newChat };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  static async addMessages(msg, room, userId){
    try{
        const chatRoom = await Chat.findOne({room})
        if (!chatRoom) {
            return { error: true, data: "Chat does not exist" };
        }
        const newMessage = await Message.create({user: userId, content: msg})
        if (!newMessage) {
            return { error: true, data: "Message cannot be created" };
        }
        chatRoom.allMessages.push(newMessage._id)
        chatRoom.save()
        return { error: false, data: newMessage };

    } catch (error){
        return { error: true, data: error };
    }
  }

  static async getChatHistory(chatId) {
    try {
      const chat = await Chat.findById(chatId);
      if (chat.allMessages.length) {
        return { error: false, data: "No Chat History" };
      }
      const chatWithMessages = chat.populate("allMessages")
      return { error: false, data: chatWithMessages };
    } catch (error) {
      return { error: true, data: error };
    }
  }
}

module.exports = ChatServices;
