import React from "react";
import { Link } from "react-router-dom";
import { dummyCourses } from "../../assets/assets";
import CourseCard from "./CourseCard";

const CourseSection = () => {
  return (
    <div className="py-16 md:px-20 px-4">
      <h2 className="text-3xl font-medium text-gray-800">
        Learn from the best
      </h2>
      <p className="md:text-base text-sm text-gray-500 mt-3">
        Discover our top-rated courses across various categories. From coding
        and design to business and wellness, our courses are crafted to deliver
        results.
      </p>
      <Link
        to={"/course-list"}
        onClick={() => scrollTo(0, 0)}
        className="text-gray-500 border border-gray-500/30 px-10 py-3 rounded"
      >
        View All Courses
      </Link>
    </div>
  );
};

export default CourseSection;
