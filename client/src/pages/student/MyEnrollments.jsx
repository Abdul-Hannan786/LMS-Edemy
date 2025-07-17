import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const MyEnrollments = () => {
  const { enrolledCourses, calculateCourseDuration, navigate } =
    useAppContext();
  const [progressArray] = useState([
    { lectureCompleted: 2, totalLectures: 4 },
    { lectureCompleted: 2, totalLectures: 7 },
    { lectureCompleted: 1, totalLectures: 5 },
    { lectureCompleted: 3, totalLectures: 3 },
    { lectureCompleted: 3, totalLectures: 6 },
    { lectureCompleted: 6, totalLectures: 8 },
    { lectureCompleted: 4, totalLectures: 4 },
    { lectureCompleted: 0, totalLectures: 4 },
  ]);

  return (
    <div className="md:px-36 px-6 p-10 pb-20">
      <h1 className="text-3xl font-semibold mb-8">My Enrollments</h1>

      <div className="rounded-xl border shadow-lg overflow-x-scroll">
        <table className="w-full text-sm text-left overflow-hidden md:table-auto">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3">Course</th>
              <th className="px-4 py-3 hidden md:table-cell">Duration</th>
              <th className="px-4 py-3 hidden md:table-cell">Completed</th>
              <th className="px-4 py-3 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {enrolledCourses.map((course, index) => {
              const progress = progressArray[index];
              const isCompleted =
                progress?.lectureCompleted === progress?.totalLectures;

              return (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="flex items-center gap-3 px-4 py-3">
                    <img
                      src={course.courseThumbnail}
                      alt="thumbnail"
                      className="w-20 object-cover rounded-md sm:w-24"
                      loading="lazy"
                    />
                    <span className="font-medium w-full flex flex-col gap-2">
                      {course.courseTitle}
                      <Progress
                        value={
                          progress
                            ? (progress.lectureCompleted * 100) /
                              progress.totalLectures
                            : 0
                        }
                        className="[&>div]:bg-gradient-to-r  [&>div]:from-cyan-400 [&>div]:via-sky-500 [&>div]:to-indigo-500 [&>div]:rounded-l-full"
                      />
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    {calculateCourseDuration(course)}
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    {progress?.lectureCompleted} / {progress?.totalLectures}{" "}
                    Lectures
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Button
                      variant={!isCompleted && "secondary"}
                      onClick={() => navigate(`/player/${course._id}`)}
                      className={`text-xs sm:text-sm ${
                        isCompleted && "bg-blue-600 text-white"
                      }`}
                    >
                      {isCompleted ? "Completed" : "View Progress"}
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyEnrollments;
