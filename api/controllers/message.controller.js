import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res, next) => {
  try {
    const { message } = req.body;
    const { id: recieverId } = req.params;
    const { id: senderId } = req.user;

    let conversation = await Conversation.findOne({
      participants: {
        $all: [senderId, recieverId],
      },
    });
    if (!conversation) {
      conversation = new Conversation({
        participants: [senderId, recieverId],
      });
    }

    const newMessage = new Message({
      senderId,
      recieverId,
      message,
    });

    if (newMessage) {
      conversation.message.push(newMessage._id);
    }

    await Promise.all(conversation.save(), newMessage.save());
    res.status(201).json(newMessage);
  } catch (error) {
    next(error);
  }
};

export const getMessage = async(req, res, next) => {
  try {
    
  } catch (error) {
    next(error);
  }
}