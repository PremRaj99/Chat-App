import React, { useEffect, useMemo } from "react";
import SenderMsg from "../components/SenderMsg";
import RecieveMsg from "../components/RecieveMsg";
import TypingMsg from "../components/TypingMsg";
import { io } from "socket.io-client";
import { useState } from "react";

export default function Home() {
  const [username, setUsername] = useState(null);
  const [showUsername, setShowUsername] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [socketId, setSocketId] = useState("");
  const [roomName, setRoomName] = useState("");

  const socket = useMemo(
    () =>
      io("http://localhost:3000", {
        withCredentials: true,
      }),
    []
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", {message, showUsername});
    setMessage("");
  };

  useEffect(() => {
    socket.on("connect", () => {
      setSocketId(socket.id);
      console.log("connected", socket.id);
    });

    socket.on("receive-message", (s) => {
      console.log(s);
    });

    // socket.on("welcome", (s) => {
    //   console.log(s);
    // });

    return () => {
      socket.disconnect({showUsername});
    };
  }, []);

  const saveUsername = (e) => {
    e.preventDefault();
    setShowUsername(username);
  };
  const removeUsername = () => {
    setShowUsername(null);
  };

  return (
    <div className="w-full bg-gray-800 h-screen">
      {showUsername ? (
        <div className="w-full container mx-auto p-8 h-screen">
          <div className="flex items-center justify-between">
            <h1 className="text-white text-2xl font-bold">Chat App</h1>
            <div className="flex gap-2 text-xs items-center">
              <p className="text-sky-400 p-1 px-3 rounded-full border border-sky-400">@{showUsername}</p>
              <button className="p-1 px-3 hover:bg-red-500 hover:text-white border border-red-500 text-red-500 rounded-full" onClick={removeUsername}>Change dummy name</button>
            </div>
          </div>
          <div className="border my-4 border-gray-600"></div>
          <div className="flex flex-col justify-end my-4 border-gray-600 h-[90%]">
            <div className="flex flex-col pb-2 px-2 w-full overflow-x-auto ">
              <SenderMsg />
              <RecieveMsg />
              <RecieveMsg />
              <SenderMsg />
              <SenderMsg />
              <RecieveMsg />
              <RecieveMsg />
              <RecieveMsg />
              <RecieveMsg />
              <RecieveMsg />
              <RecieveMsg />
              <TypingMsg />
            </div>
            <form onSubmit={handleSubmit} className="flex mt-2">
              <input
                type="text"
                className="flex-1 text-gray-300 text-sm bg-gray-700 rounded-l-xl p-4 outline-none"
                placeholder="Write Something..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                type="submit"
                className="px-6 font-semibold hover:bg-blue-800 rounded-r-lg bg-blue-700"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="w-full container mx-auto p-8 h-screen">
          <h1 className="text-white text-2xl font-bold">Chat App</h1>
          <div className="border my-4 border-gray-600"></div>
          <form
            onSubmit={saveUsername}
            className="flex text-white flex-col my-4 border-gray-600 h-[90%]"
          >
            <label htmlFor="" className="py-3">Enter Dummy Name</label>
            <input
              type="text"
              className="text-gray-300 text-sm bg-gray-700 rounded-xl p-4 outline-none"
              placeholder="Dummy Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button type="submit" className="my-4 p-2 rounded-lg hover:underline text-blue-600 hover:border-2 hover:border-blue-600">
              Save
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
