import { assets } from "@/assets/assets";
import { useAppContext } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { NavLink, useLocation } from "react-router-dom";
import React from "react";

const Sidebar = () => {
  const { isEducator } = useAppContext();
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/educator", icon: assets.home_icon },
    { name: "Add Course", path: "/educator/add-course", icon: assets.add_icon },
    {
      name: "My Courses",
      path: "/educator/my-courses",
      icon: assets.my_course_icon,
    },
    {
      name: "Student Enrolled",
      path: "/educator/student-enrolled",
      icon: assets.person_tick_icon,
    },
  ];

  return (
    isEducator && (
      <TooltipProvider>
        <aside className="md:w-64 w-16 min-h-screen border-r bg-white flex flex-col items-center md:items-start px-2 py-4 gap-4">
          {/* Menu Items */}
          <nav className="flex flex-col gap-2 w-full mt-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <Tooltip key={item.name} className="bg-blue-600">
                  <TooltipTrigger asChild>
                    <NavLink to={item.path}>
                      <Button
                        variant="ghost"
                        className={`w-full justify-start gap-3 rounded-lg px-3 py-2 transition-colors ${
                          isActive
                            ? "bg-blue-100 text-blue-600"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        <img
                          src={item.icon}
                          alt={item.name}
                          className={`w-5 h-5`}
                        />
                        <span className="hidden md:inline text-sm font-medium">
                          {item.name}
                        </span>
                      </Button>
                    </NavLink>
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    className="md:hidden bg-blue-600"
                  >
                    {item.name}
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </nav>
        </aside>
      </TooltipProvider>
    )
  );
};

export default Sidebar;
