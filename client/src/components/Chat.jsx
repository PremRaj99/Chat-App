import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa6";
import { IoIosSend } from "react-icons/io";
import RecieveMsg from "./RecieveMsg";
import SenderMsg from "./SenderMsg";
import { useSelector } from "react-redux";

export default function Chat({ sender, senderData }) {
  const [messages, setMessages] = useState([]);
  const [sendMessage, setSendMessage] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser._id);
  console.log(messages);
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`/api/message/${sender}`);
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.log("no message received" + error.message);
      }
    };
    fetchMessages();

    // Set up polling
    const intervalId = setInterval(fetchMessages, 1000); // Poll every 1000ms (1 second)

    // Clean up the interval on component unmount or sender change
    return () => clearInterval(intervalId);
  }, [sender]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/message/send/" + sender, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: sendMessage,
          // senderId: currentUser._id,
          // receiverId: sender,
        }),
      });
      if (!response.ok) {
        throw new Error("Server Error");
      }
      const data = await response.json();
      setMessages([...messages, data]);
      setSendMessage("");
    } catch (error) {
      console.log("Error sending message" + error.message);
    }
  };

  return (
    <div className="flex-1 flex flex-col mt-1 mb-1 mr-1 rounded-md grad {bg-slate-600}">
      {sender !== null && senderData !== null ? (
        <div className="flex items-center justify-center flex-col h-full">
          {/* head */}
          <div className="flex h-14 w-full bg-slate-700 border-b border-slate-900 justify-between items-center">
            <div className="flex px-4 gap-2 ">
              <img src={senderData.profilePicture} className="w-10" alt="" />
              <h2 className="font-semibold text-lg">{senderData.fullName}</h2>
            </div>
            <div className="px-4">
              <FaBars className="text-3xl text-slate-300" />
            </div>
          </div>
          {/* Body */}
          <div className="flex-1 flex flex-col p-4 w-full overflow-auto mb-1">
            {messages.map((msg) =>
              msg.senderId === currentUser._id ? (
                <SenderMsg message={msg.message} />
              ) : (
                <RecieveMsg
                  message={msg.message}
                  fullName={senderData.fullName}
                />
              )
            )}
          </div>
          {/* Footer */}
          <form
            onSubmit={handleSubmit}
            className="flex h-14 w-full bg-slate-700 border-t border-slate-900 justify-between items-center"
          >
            <input
              type="text"
              value={sendMessage}
              onChange={(e) => setSendMessage(e.target.value)}
              className="flex-1 h-10 bg-transparent outline-none p-2"
              placeholder="Write here something..."
            />
            <button
              type="submit"
              className="p-3 px-4 text-2xl rounded-md bg-slate-800"
              title="Send"
            >
              <IoIosSend />
            </button>
          </form>
        </div>
      ) : (
        <div className="flex h-full justify-center items-center">
          No chats found!
        </div>
      )}
    </div>
  );
}
