import Loading from "@/components/student/Loading";
import { useAppContext } from "@/context/AppContext";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const StudentsEnrolled = () => {
  const { getToken, isEducator } = useAppContext();
  const [enrolledStudents, setEnrolledStudents] = useState(null);

  const fetchEnrolledStudents = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get("/api/educator/enrolled-students", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setEnrolledStudents(data.enrolledStudents.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isEducator) {
      fetchEnrolledStudents();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEducator]);

  return enrolledStudents ? (
    <div className="min-h-screen flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0">
      <div className="rounded-xl border shadow-lg w-full flex flex-col items-center max-w-4xl overflow-hidden">
        <table className="text-sm text-left w-full overflow-hidden">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3 hidden md:table-cell">#</th>
              <th className="px-4 py-3">Student Name</th>
              <th className="px-4 py-3">Course Title</th>
              <th className="px-4 py-3 hidden md:table-cell">Date</th>
              {/* Add more columns as needed */}
            </tr>
          </thead>
          <tbody className="divide-y">
            {enrolledStudents.map((course, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-500 font-medium hidden md:table-cell">
                  {index + 1}
                </td>

                {/* Student image and name */}
                <td className="md:px-4 px-2 py-3">
                  <div className="flex items-center gap-2 md:gap-3">
                    <img
                      src={course.student.imageUrl}
                      alt="Student account picture"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <span className="font-medium text-[13px] md:text-[15px]">
                      {course.student.name}
                    </span>
                  </div>
                </td>
 
                {/* Course Title */}
                <td className="px-5 py-3 text-[13px] md:text-[15px]">
                  {course.courseTitle}
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  {new Date(course.purchaseDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default StudentsEnrolled;
