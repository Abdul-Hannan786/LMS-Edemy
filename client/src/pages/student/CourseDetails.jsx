import Loading from "@/components/student/Loading";
import { useAppContext } from "@/context/AppContext";
import { Star } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CourseDetails = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);

  const { allCourses, calculateRating } = useAppContext();
  const fetchCourseData = async () => {
    const course = allCourses.find((course) => course._id === id);
    setCourseData(course);
  };

  useEffect(() => {
    fetchCourseData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return courseData ? (
    <div className="flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 md:pt-20 pt-10 text-left">
      <div className="absolute top-0 left-0 w-full h-[500px] z-0 bg-gradient-to-b from-cyan-100/70"></div>

      {/* Left Column */}
      <div className="max-w-xl z-10 text-gray-500">
        <h1 className="md:text-[36px] md:leading-11 leading-9 text-[26px] font-semibold text-gray-800">
          {courseData.courseTitle}
        </h1>
        <p
          className="pt-4 md:text-base text-sm"
          dangerouslySetInnerHTML={{
            __html: courseData.courseDescription.slice(0, 250),
          }}
        ></p>

        {/* Review and rating */}
        <div className="flex items-center gap-1 pt-2 pb-1 text-sm text-gray-700">
          <p className="font-medium">{calculateRating(courseData)}</p>
          <div className="flex gap-[2px] text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={`${
                  i < Math.floor(calculateRating(courseData))
                    ? "fill-yellow-400 stroke-yellow-400"
                    : "stroke-gray-400"
                }`}
              />
            ))}
          </div>
          <p className="text-blue-600 ml-1">
            ({courseData.courseRatings.length}{" "}
            {courseData.courseRatings.length > 1 ? "ratings" : "rating"})
          </p>
          <p className="ml-2">
            {courseData.enrolledStudents.length}{" "}
            {courseData.enrolledStudents.length > 1 ? "students" : "student"}
          </p>
        </div>

        <p className="text-sm">
          Course by{" "}
          <span className="text-blue-600 underline">Abdul Hannan</span>
        </p>
      </div>

      {/* Right Column */}
      <div></div>
    </div>
  ) : (
    <Loading />
  );
};

export default CourseDetails;
