import React from "react";

export default function RecieveMsg({ message, fullName }) {
  return (
    <div className="p-2 pt-0 rounded-md rounded-tl-none self-start my-1 text-sm text-white max-w-[40ch] sm:max-w-[70%] bg-slate-700 w-fit">
      <p className="text-[10px] text-sky-500">{fullName}</p>
      <span className="ps-2 pe-4">{message}</span>
    </div>
  );
}
