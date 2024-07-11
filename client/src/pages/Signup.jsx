import React, { useState } from "react";
import { FaSpinner } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [formdata, setFormdata] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    gender: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  console.log(formdata);

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.id]: e.target.value });
  };
  
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setErrorMessage(null);
      if (
        !formdata.fullName ||
        !formdata.username ||
        !formdata.email ||
        !formdata.password ||
        !formdata.confirmPassword ||
        !formdata.gender ||
        formdata.fullName === "" ||
        formdata.gender === "" ||
        formdata.confirmPassword === "" ||
        formdata.email === "" ||
        formdata.password === "" ||
        formdata.username === ""
      ) {
        setLoading(false);
        return setErrorMessage("Plesase fill out all the fields.");
      }
      if (formdata.password !== formdata.confirmPassword) {
        setLoading(false);
        return setErrorMessage("Passwords do not match");
      }
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      if (res.ok) {
        navigate("/login");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
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
        <form onSubmit={handleSignup} className="flex flex-col w-72 gap-4">
          <h1 className="text-4xl font-semibold mb-4 text-gray-100">Signup</h1>
          <input
            type="text"
            id="fullName"
            onChange={handleChange}
            value={formdata.fullName}
            placeholder="Full name"
            className="p-2 px-4 bg-gray-700 text-gray-100 rounded-md w-full"
          />
          <input
            type="text"
            id="username"
            onChange={handleChange}
            value={formdata.username}
            placeholder="Username"
            className="p-2 px-4 bg-gray-700 text-gray-100 rounded-md w-full"
          />
          <input
            type="email"
            id="email"
            onChange={handleChange}
            placeholder="Email Address"
            value={formdata.email}
            className="p-2 px-4 bg-gray-700 text-gray-100 rounded-md w-full"
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={formdata.password}
            onChange={handleChange}
            className="p-2 px-4 bg-gray-700 text-gray-100 rounded-md w-full"
          />
          <input
            type="password"
            id="confirmPassword"
            value={formdata.confirmPassword}
            placeholder="Re-enter Password"
            onChange={handleChange}
            className="p-2 px-4 bg-gray-700 text-gray-100 rounded-md w-full"
          />
          <select
            label="Gender"
            id="gender"
            value={formdata.gender}
            onChange={handleChange}
            className="p-2 px-4 bg-gray-700 text-gray-100 rounded-md w-full"
          >
            <option disabled value="">
              --Gender--
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <button
            type="submit"
            disabled={loading}
            className="p-2 w-full flex items-center justify-center gap-2 rounded-md hover:bg-blue-700 bg-blue-500 text-white"
          >
            {loading ? (
                <>
                  <FaSpinner className="text-md" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign Up"
              )}
          </button>
          <p className="text-gray-100">
            Already Have an Account?{" "}
            <span
              className="text-blue-400 hover:underline cursor-pointer"
              onClick={() => {
                navigate("/login");
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
