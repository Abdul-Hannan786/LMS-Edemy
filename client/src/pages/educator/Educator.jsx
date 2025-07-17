import Navbar from "@/components/educator/Navbar";
import Sidebar from "@/components/educator/Sidebar";
import React from "react";
import { Outlet } from "react-router-dom";

const Educator = () => {
  return (
    <div className="text-default min-h-screen bg-white">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <Outlet />
      </div>
      <div></div>
    </div>
  );
};

export default Educator;
