import { assets } from "@/assets/assets";
import CourseCard from "@/components/student/CourseCard";
import Footer from "@/components/student/Footer";
import SearchBar from "@/components/student/SearchBar";
import { useAppContext } from "@/context/AppContext";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CoursesList = () => {
  const { navigate, allCourses } = useAppContext();
  const { input } = useParams();
  const [filteredCourse, setFilteredCourse] = useState([]);

  useEffect(() => {
    if (allCourses && allCourses.length > 0) {
      const tempCourses = allCourses.slice();

      input
        ? setFilteredCourse(
            tempCourses.filter((item) =>
              item.courseTitle.toLowerCase().includes(input.toLowerCase())
            )
          )
        : setFilteredCourse(tempCourses);
    }
  }, [allCourses, input]);

  return (
    <>
      <div className="relative md:px-24 px-8 pt-20 text-left">
        <div className="flex md:flex-row flex-col gap-6 items-start justify-between w-full">
          <div>
            <h1 className="text-4xl font-semibold text-gray-800">
              Course List
            </h1>
            <p className="text-gray-500">
              <span
                onClick={() => navigate(-1)}
                className="text-blue-600 cursor-pointer"
              >
                Home
              </span>{" "}
              / Course List
            </p>
          </div>

          <SearchBar data={input} />
        </div>

        {input && (
          <div className="inline-flex items-center gap-4 px-4 py-2 border rounded mt-8 -mb-8 text-gray-600">
            <p>{input}</p>
            <img
              src={assets.cross_icon}
              alt="cancel icon"
              className="cursor-pointer"
              onClick={() => {
                navigate("/course-list");
              }}
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 my-16 gap-6 px-2 md:p-0">
          {filteredCourse.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CoursesList;
