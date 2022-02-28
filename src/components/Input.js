import React from "react";

export default function Input({ register, label, ...props }) {
  return (
    <input
      {...props}
      {...register(label)}
      className="border border-gray-300 rounded-lg w-full focus:outline-none focus:border-blue-400"
    />
  );
}
