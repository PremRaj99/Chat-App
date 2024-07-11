import React, { useEffect, useMemo } from "react";
import { io } from "socket.io-client";
import { useState } from "react";
import SideBar from "../components/SideBar";
import { IoMdPerson, IoMdSettings } from "react-icons/io";
import { MdGroups } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserProfile from "../components/UserProfile";
import { SignoutUserSuccess } from "../redux/User/userSlice";
import { FaBars } from "react-icons/fa6";

export default function Home() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(SignoutUserSuccess());
        navigate(`/login`);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="w-full flex text-gray-50 bg-gray-800 h-screen">
      {/* ---------------nav bar----------- */}
      <div className="w-14 py-5 px-1 flex flex-col justify-between">
        <div className="">
          {/* <button
            className="text-3xl rounded-full hover:bg-gray-900 p-1 cursor-pointer my-2 mx-auto md:hidden"
            onClick={toggleSidebar}
          >
            ☰
          </button> */}
          <FaBars
            onClick={toggleSidebar}
            className="text-4xl rounded-full hover:bg-gray-900 p-1 cursor-pointer my-2 mx-auto md:hidden"
          />
          <IoMdPerson
            className="text-4xl rounded-full hover:bg-gray-900 p-1 cursor-pointer my-2 mx-auto"
            title="Individual"
          />
          <MdGroups
            className="text-4xl rounded-full hover:bg-gray-900 p-1 cursor-pointer my-2 mx-auto"
            title="Group"
          />
        </div>
        <div className="">
          <UserProfile
            currentUser={currentUser}
            handleSignout={handleSignout}
          />
          <IoMdSettings
            className="text-4xl rounded-full hover:bg-gray-900 p-1 cursor-pointer my-2 mx-auto"
            title="Setting"
          />
        </div>
      </div>
      {/* ---------------Side bar---------- */}
      <div className="flex-1 p-1">
        <SideBar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      </div>
    </div>
  );
}
