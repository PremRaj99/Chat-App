import React, { useEffect, useState } from "react";
import Chat from "./Chat";
import ConversationCard from "./ConversationCard";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

export default function SideBar() {
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
      <div className="flex p-2 gap-2  flex-col border-r border-slate-900 w-80">
        <h2 className="text-2xl p-2 border-b border-gray-500 font-semibold">
          Chats
        </h2>
        <div className="overflow-auto p-1">
          {conversations &&
            conversations.map((conversation) => (
              <ConversationCard
                key={conversation._id}
                conversation={conversation}
                tab={tab}
              />
            ))}
        </div>
      </div>
      <Chat sender={tab} senderData={senderData} />
    </div>
  );
}
