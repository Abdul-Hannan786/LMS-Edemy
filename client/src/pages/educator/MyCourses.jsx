import { useAppContext } from "@/context/AppContext";
import React from "react";

const MyCourses = () => {
  const { allCourses } = useAppContext();

  return (
    <div>
      <h1>My Courses</h1>
    </div>
  );
};

export default MyCourses;
