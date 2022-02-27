import React from "react";

export default function Input({ register, label, ...props }) {
  return (
    <input
      {...props}
      {...register(label)}
      className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-400"
    />
  );
}
