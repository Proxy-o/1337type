import React from "react";
import Login from "../_components/login";

export default function page() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="rounded-sm border p-2">
        <Login />
      </div>
    </div>
  );
}
