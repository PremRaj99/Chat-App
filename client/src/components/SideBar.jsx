import React, { useEffect, useState } from "react";
import Chat from "./Chat";
import ConversationCard from "./ConversationCard";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

export default function SideBar({ toggleSidebar, isSidebarOpen }) {
  const currentUser = useSelector((state) => state.user);
  const [senderData, setSenderData] = useState(null);
  const [conversations, setConversations] = useState([]);
  const location = useLocation();
  const [tab, setTab] = useState("");

  const navigate = useNavigate();
  console.log(tab);

  useEffect(() => {
    const fetchConversation = async () => {
      try {
        const getconversation = await fetch("/api/users");
        const data = await getconversation.json();
        setConversations(data);
      } catch (error) {
        console.log(error);
        navigate("/login");
      }
    };
    fetchConversation();
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch("/api/users/" + tab);
      const data = await response.json();
      setSenderData(data);
    };
    fetchUser();
  }, [tab]);

  return (
    <div className="flex h-full bg-slate-700 rounded-md">
      <div
        className={`fixed top-0 left-0 w-80 h-full bg-slate-700 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 rounded-r-md md:rounded-none bg-black md:relative md:translate-x-0 flex flex-col p-2 gap-2 border-r border-slate-900`}
      >
        <div className="flex justify-between items-center border-b border-gray-500 p-2">
          <h2 className="text-2xl font-semibold">Chats</h2>
          <button
            className="text-xl font-bold p-2 md:hidden"
            onClick={toggleSidebar}
          >
            ✕
          </button>
        </div>
        <div className="overflow-auto p-1">
          {conversations &&
            conversations.map((conversation) => (
              <ConversationCard
                key={conversation._id}
                conversation={conversation}
                tab={tab}
                toggleSidebar={toggleSidebar} // Pass toggleSidebar as a prop
              />
            ))}
        </div>
      </div>
      <Chat sender={tab} senderData={senderData} />
    </div>
  );
}
