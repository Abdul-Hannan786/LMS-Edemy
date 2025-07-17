/* eslint-disable react-hooks/exhaustive-deps */
import Loading from "@/components/student/Loading";
import { useAppContext } from "@/context/AppContext";
import { useEffect, useState } from "react";

const MyCourses = () => {
  const { allCourses } = useAppContext();
  const [courses, setCourses] = useState([]);

  const fetchEducatorCourses = async () => {
    setCourses(allCourses);
  };

  useEffect(() => {
    fetchEducatorCourses();
  }, [courses]);

  return courses ? (
    <div className="h-auto flex flex-col items-start justify-between md:p-8 p-4 pt-8 pb-20">
      <div className="w-full">
        <h2 className="pb-4 text-2xl font-medium">My Courses</h2>
        <div className="rounded-xl border shadow-lg overflow-x-scroll">
          <table className="w-full text-sm text-left overflow-hidden md:table-auto">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-3">All Courses</th>
                <th className="px-4 py-3 ">Earnings</th>
                <th className="px-4 py-3 ">Students</th>
                <th className="px-4 py-3 text-center hidden md:table-cell">
                  Published on
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {courses.map((course, index) => {
                return ( 
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="flex items-center gap-3 px-4 py-3">
                      <img
                        src={course.courseThumbnail}
                        alt="thumbnail"
                        className="w-20 object-cover rounded-md sm:w-24"
                        loading="lazy"
                      />
                      <span className="font-medium w-full md:flex flex-col gap-2 hidden ">
                        {course.courseTitle}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      $
                      {Math.floor(
                        course.enrolledStudents.length *
                          (course.coursePrice -
                            (course.discount * course.coursePrice) / 100)
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {course.enrolledStudents.length}
                    </td>
                    <td className="px-4 py-3 text-center hidden md:table-cell">
                      {new Date(course.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default MyCourses;
