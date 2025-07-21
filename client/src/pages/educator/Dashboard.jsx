/* eslint-disable react-hooks/exhaustive-deps */
import Loading from "@/components/student/Loading";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { GraduationCap, BookOpen, DollarSign } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const { getToken, isEducator } = useAppContext();

  const fetchDashboardData = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get("/api/educator/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setDashboardData(data.dashboardData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
   if(isEducator){
    fetchDashboardData()
   }
  }, [isEducator]);

  return dashboardData ? (
    <div className="p-6 space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="bg-[#e8f1ff] flex items-center justify-between p-5 shadow-lg border border-blue-100 transition hover:shadow-xl">
          <div className="rounded-full p-3 bg-blue-600">
            <GraduationCap className="text-white w-5 h-5" />
          </div>
          <div className="text-center">
            <div className="text-2xl font-extrabold">
              {dashboardData.enrolledStudentsData.length}
            </div>
            <div className="text-sm text-muted-foreground">
              Total Enrollments
            </div>
          </div>
        </Card>

        {/* Total Courses */}
        <Card className="bg-[#f2e8ff] flex items-center justify-between p-5 shadow-lg border border-purple-100 transition hover:shadow-xl">
          <div className="rounded-full p-3 bg-purple-600">
            <BookOpen className="text-white w-5 h-5" />
          </div>
          <div className="text-center">
            <div className="text-2xl font-extrabold">
              {dashboardData.totalCourses}
            </div>
            <div className="text-sm text-muted-foreground">Total Courses</div>
          </div>
        </Card>

        {/* Total Earnings */}
        <Card className="bg-[#e9fdf2] flex items-center justify-between p-5 shadow-lg border border-green-100 transition hover:shadow-xl">
          <div className="rounded-full p-3 bg-green-600">
            <DollarSign className="text-white w-5 h-5" />
          </div>
          <div className="text-center">
            <div className="text-2xl font-extrabold">
              ${dashboardData.totalEarnings}
            </div>
            <div className="text-sm text-muted-foreground">Total Earnings</div>
          </div>
        </Card>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Latest Enrollments</h2>

        <div className="rounded-xl border shadow-lg w-full flex flex-col items-center max-w-4xl overflow-hidden">
          <table className="text-sm text-left w-full overflow-hidden">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-3 hidden md:table-cell">#</th>
                <th className="px-4 py-3">Student</th>
                <th className="px-4 py-3">Course</th>
                {/* Add more columns as needed */}
              </tr>
            </thead>
            <tbody className="divide-y">
              {dashboardData.enrolledStudentsData.map((course, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-500 font-medium hidden md:table-cell  ">
                    {index + 1}
                  </td>

                  {/* Student image and name */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
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
                  <td className="px-4 py-3 text-[13px] md:text-[15px]">
                    {course.courseTitle}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Dashboard;
