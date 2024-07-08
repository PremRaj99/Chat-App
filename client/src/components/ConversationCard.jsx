import React from "react";
import formatDate from "../../utils/formatedDate";
import { Link } from 'react-router-dom'

export default function ConversationCard({ conversation, tab }) {
  return (
    <Link to={`/?tab=${conversation._id}`} className={`flex items-center ${tab === conversation._id ? "bg-slate-900": "" } p-2 gap-2 hover:bg-slate-800 rounded-md w-full h-20`}>
      <img
        src={conversation.profilePicture}
        className="aspect-square object-cover w-14 h-14"
        alt=""
      />
      <div className="flex-1 ">
        <div className="flex justify-between">
          <h3 className="font-semibold text-nowrap w-[17ch] overflow-hidden">
            {conversation.fullName}
          </h3>
          <div className="text-gray-400 font-normal text-xs">
            {/* 10:30 */}
            {formatDate(conversation.createdAt)}
          </div>
        </div>
        <p className="text-gray-400 font-normal text-nowrap text-sm w-[25ch] overflow-hidden">
          {conversation.email}
        </p>
      </div>
    </Link>
  );
}
