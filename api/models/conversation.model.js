import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    message: {
      type: Array,
      default: [],
    },
    participants: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;
 