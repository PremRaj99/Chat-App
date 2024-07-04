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

    await Promise.all([conversation.save(), newMessage.save()]);
    res.status(201).json(newMessage);
  } catch (error) {
    next(error);
  }
};

export const getMessage = async (req, res, next) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user.id;

    const conversation = await Conversation.findOne({
      participants: {
        $all: [senderId, userToChatId],
      },
    });
    if (!conversation) {
      return res.status(404).json([]);
    }
    const message = await Message.find({ _id: { $in: conversation.message } });

    // res.status(200).json(conversation.message);
    res.status(200).json(message);
  } catch (error) {
    next(error);
  }
};
