import { chatManager } from "../DAL/DAOs/MongoDAOs/managers/chatManager.mongo.js";

class ChatServices {
  async newChat() {
    const response = await chatManager.createOne();
    return response;
  }

  async findChats(cid) {
    const response = await chatManager.getMessages(cid);
    return response;
  }

  async sendAndGet(cid, obj) {
    const response = await chatManager.insertChat(cid, obj);
    return response;
  };

  async clear(cid){
    const response = await chatManager.clearChat(cid);
    return response;
  }
}

export const chatServices = new ChatServices();
