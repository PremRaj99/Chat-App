import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/User/userSlice";
import { FaSpinner } from "react-icons/fa6";

export default function Login() {
  const [formData, setData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      return dispatch(signInFailure("Plesase fill out all the fields."));
    }
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="w-full grad {bg-slate-600} h-screen">
      <h1 className="w-full h-14 bg-black text-white text-2xl font-serif shadow-md shadow-slate-500 font-semibold flex items-center p-4 absolute">
        Chat App
      </h1>
      <div className="flex flex-col md:flex-row gap-10 h-screen justify-center items-center">
        <div className="md:flex hidden flex-col w-72">
          <img
            src="https://static.vecteezy.com/system/resources/previews/020/945/959/original/chat-app-logo-png.png"
            alt="chat app"
            className="w-40 mb-4 drop-shadow-[0_2px_2px_rgba(255,255,255,255.02)]"
          />
          <p className="text-gray-200 text-xs">
            Enjoy seamless and real-time conversations. Whether it's a quick
            hello or a long chat, we’ve got you covered.
          </p>
        </div>
        {/* Login Form */}
        <form onSubmit={handleLogin} className="flex flex-col w-72 gap-4">
          <h1 className="text-4xl font-semibold mb-4 text-gray-100">Login</h1>
          <input
            type="text"
            placeholder="Username"
            id="username"
            onChange={handleChange}
            className="p-2 px-4 bg-gray-700 text-gray-100 rounded-md w-full"
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            onChange={handleChange}
            className="p-2 px-4 bg-gray-700 text-gray-100 rounded-md w-full"
          />
          <button
            type="submit"
            className="p-2 w-full flex items-center justify-center gap-2 rounded-md hover:bg-blue-700 bg-blue-500 text-white"
          >
            {loading ? (
                <>
                  <FaSpinner className="text-md" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Log In"
              )}
          </button>
          <p className="text-gray-100">
            Doesn't Have an Account?{" "}
            <span
              className="text-blue-400 hover:underline cursor-pointer"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Click Here
            </span>
          </p>
          {errorMessage && (
            <p className="mt-5 text-sm p-2 w-full rounded-md text-center bg-red-200 text-red-700" color="failure">
              {errorMessage}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
