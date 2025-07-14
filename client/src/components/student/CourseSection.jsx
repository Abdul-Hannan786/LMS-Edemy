import React from "react";
import { Link } from "react-router-dom";
import { dummyCourses } from "../../assets/assets";
import CourseCard from "./CourseCard";
import { useAppContext } from "../../context/AppContext";

const CourseSection = () => {
  const { allCourses } = useAppContext();

  return (
    <div className="py-16 md:px-20 px-4">
      <h2 className="text-3xl font-medium text-gray-800">
        Learn from the best
      </h2>
      <p className="md:text-base text-sm text-gray-500 mt-3">
        Discover our top-rated courses across various categories. From coding
        and design to <br /> business and wellness, our courses are crafted to
        deliver results.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 px-4 md:px-0 md:my-16 my-10 gap-8">
        {allCourses.slice(0, 3).map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>

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
