import React from "react";

export default function SenderMsg({ message }) {
  return (
    <div className="py-2 px-6 rounded-md rounded-tr-none self-end my-1 text-sm text-white max-w-[40ch] sm:max-w-[70%] bg-sky-800 w-fit">
      {message}
    </div>
  );
}
