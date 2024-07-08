import React, { useRef, useState } from "react";

const UserProfile = ({ currentUser, handleSignout }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  let timer;

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleBlur = () => {
    timer = setTimeout(() => {
      setDropdownVisible(false);
    }, 100);
  };

  const handleFocus = () => {
    clearTimeout(timer);
  };

  return (
    <div
      className="relative inline-block"
      tabIndex={0}
      onBlur={handleBlur}
      onFocus={handleFocus}
    >
      <img
        src={currentUser.profilePicture}
        className="w-12 h-12 rounded-full hover:bg-white p-1 cursor-pointer my-2 mx-auto"
        title={"@" + currentUser.username}
        alt="profile"
        onClick={toggleDropdown}
      />
      {dropdownVisible && (
        <div
          ref={dropdownRef}
          className="absolute bottom-0 left-12 mt-2 w-48 bg-gray-600 border border-gray-900 rounded-md shadow-lg"
        >
          <ul className="py-1">
            <li className="px-4 py-2 hover:bg-gray-800 cursor-pointer">
              Profile
            </li>
            <li className="px-4 py-2 hover:bg-gray-800 cursor-pointer">
              Settings
            </li>
            <li onClick={handleSignout} className="px-4 py-2 hover:bg-gray-800 cursor-pointer">
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
