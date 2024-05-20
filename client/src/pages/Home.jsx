import React from "react";
import SenderMsg from "../components/SenderMsg";
import RecieveMsg from "../components/RecieveMsg";
import TypingMsg from "../components/TypingMsg";

export default function Home() {
  return (
    <div className="w-full container mx-auto p-8 bg-gray-800 h-screen">
      <h1 className="text-white text-2xl font-bold">Chat App</h1>
      <div className="border my-4 border-gray-600"></div>
      <div className="flex flex-col justify-end my-4 border-gray-600 h-[90%]">
            <div className="flex flex-col pb-2 px-2 w-full overflow-x-auto ">
                <SenderMsg/>
                <RecieveMsg/>
                <RecieveMsg/>
                <SenderMsg/>
                <SenderMsg/>
                <RecieveMsg/>
                <RecieveMsg/>
                <RecieveMsg/>
                <RecieveMsg/>
                <RecieveMsg/>
                <RecieveMsg/>
                <TypingMsg/>


            </div>
        <div className="flex mt-2">
          <input type="text" className="flex-1 text-gray-300 text-sm bg-gray-700 rounded-l-xl p-4 outline-none" placeholder="Write Something..."/>
          <button className="px-6 font-semibold hover:bg-blue-800 rounded-r-lg bg-blue-700">Send</button>
        </div>
      </div>
    </div>
  );
}
