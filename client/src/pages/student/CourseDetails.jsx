import Loading from "@/components/student/Loading";
import { useAppContext } from "@/context/AppContext";
import { Star } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { assets } from "@/assets/assets";
import humanizeDuration from "humanize-duration";
import YouTube from "react-youtube";
import toast from "react-hot-toast";
import axios from "axios";

const CourseDetails = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false);
  const [playerData, setPlayerData] = useState(null);

  const {
    calculateRating,
    calculateNoOfLectures,
    calculateCourseDuration,
    calculateChapterTime,
    userData,
    getToken,
  } = useAppContext();
  const fetchCourseData = async () => {
    try {
      const { data } = await axios.get(`/api/course/${id}`);
      if (data.success) {
        setCourseData(data.courseData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const enrollCourse = async () => {
    try {
      if (!userData) {
        return toast.error("Login to enroll");
      }
      if (isAlreadyEnrolled) {
        return toast("Already Enrolled");
      }

      const token = await getToken();
      const { data } = await axios.post(
        "/api/user/purchase",
        { courseId: courseData._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        const { session_url } = data;
        window.location.replace(session_url);
      } else {
        toast.error(toast.error);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchCourseData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (userData && courseData) {
      setIsAlreadyEnrolled(userData.enrolledCourses.includes(courseData._id));
    }
  }, [userData, courseData]);

  return courseData ? (
    <div className="relative flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 md:pt-20 pt-10 text-left pb-10">
      <div className="absolute top-0 left-0 w-full h-[500px] z-0 bg-gradient-to-b from-cyan-100/70"></div>

      {/* Left Column */}
      <div className="max-w-2xl z-10 text-gray-500">
        <h1 className="md:text-[36px] md:leading-11 leading-9 text-[26px] font-semibold text-gray-800">
          {courseData.courseTitle}
        </h1>
        <p
          className="pt-4 md:text-base text-sm"
          dangerouslySetInnerHTML={{
            __html: courseData.courseDescription.slice(0, 200),
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
          <span className="text-blue-600 underline">
            {courseData.educator.name}
          </span>
        </p>

        <div className="pt-8 text-gray-800">
          <h2 className="text-xl font-semibold">Course Structure</h2>
          <div className="pt-5">
            <div className="w-full space-y-4">
              <Accordion
                type="single"
                collapsible
                className="w-full shadow-xl md:shadow-2xl p-5 rounded-xl"
              >
                {courseData.courseContent.map((chapter, index) => (
                  <AccordionItem key={index} value={chapter.chapterTitle}>
                    <AccordionTrigger className="text-base font-semibold">
                      {chapter.chapterTitle}
                      <span className="text-sm font-normal ml-auto">
                        {chapter.chapterContent.length} lectures -{" "}
                        {calculateChapterTime(chapter)}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <Card className="p-4 gap-3">
                        {chapter.chapterContent.map((lecture, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center"
                          >
                            <span className="flex items-center gap-2">
                              <img
                                src={assets.play_icon}
                                alt="play icon"
                                className="w-4 h-4 mt-1 cursor-pointer"
                                loading="lazy"
                              />{" "}
                              {lecture.lectureTitle}
                            </span>
                            <span className="text-sm flex gap-2">
                              {/* Preview 12 hours */}
                              {lecture.isPreviewFree && (
                                <span
                                  onClick={() =>
                                    setPlayerData({
                                      videoId: lecture.lectureUrl
                                        .split("/")
                                        .pop(),
                                    })
                                  }
                                  className="text-sm text-blue-600 cursor-pointer"
                                >
                                  Preview
                                </span>
                              )}
                              {humanizeDuration(
                                lecture.lectureDuration * 60 * 1000,
                                { units: ["h", "m"] }
                              )}
                            </span>
                          </div>
                        ))}
                      </Card>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>

        <div className="py-14 text-sm md:text-default">
          <h3 className="text-2xl md:text-3xl font-semibold text-gray-800">
            Course Description
          </h3>
          <p
            className="pt-3 rich-text"
            dangerouslySetInnerHTML={{
              __html: courseData.courseDescription,
            }}
          ></p>
        </div>
      </div>

      {/* Right Column */}
      <div className="max-w-[424px] z-10 shadow-xl rounded-lg overflow-hidden bg-white min-w-[300px] sm:min-w-[420px]">
        {playerData ? (
          <YouTube
            videoId={playerData.videoId}
            opts={{
              playerVars: {
                autoplay: 1,
              },
            }}
            iframeClassName="w-full aspect-video"
          />
        ) : (
          <img
            src={courseData.courseThumbnail}
            loading="lazy"
            alt="course thumbnail"
          />
        )}

        <div className="p-5">
          <div className="flex items-center gap-2">
            <img
              src={assets.time_left_clock_icon}
              alt="time left clock icon"
              className="w-3.5"
              loading="lazy"
            />
            <p className="text-red-500">
              <span className="font-medium">5 days</span> left at this price!
            </p>
          </div>
          <div className="flex gap-3 items-center pt-2">
            <p className="text-gray-800 md:text-4xl text-2xl font-semibold">
              $
              {(
                courseData.coursePrice -
                (courseData.discount * courseData.coursePrice) / 100
              ).toFixed(2)}
            </p>
            <p className="md:text-lg text-gray-500 line-through">
              ${courseData.coursePrice}
            </p>
            <p className="md:text-lg text-gray-500">
              {courseData.discount}% off
            </p>
          </div>
          <div className="flex items-center text-sm md:text-default gap-4 pt-2 md:pt-4 text-gray-500">
            <div className="flex items-center gap-1">
              <Star size={16} className="fill-yellow-400 stroke-yellow-400" />
              <p>{calculateRating(courseData)}</p>
            </div>

            <div className="h-4 w-px bg-gray-500/40"></div>

            <div className="flex items-center gap-2">
              <img
                src={assets.time_clock_icon}
                alt="clock icon"
                loading="lazy"
              />
              <p>{calculateCourseDuration(courseData)}</p>
            </div>

            <div className="h-4 w-px bg-gray-500/40"></div>

            <div className="flex items-center gap-2">
              <img src={assets.lesson_icon} alt="lesson icon" loading="lazy" />
              <p>{calculateNoOfLectures(courseData)} lessons</p>
            </div>
          </div>
          <button
            onClick={enrollCourse}
            className="md:mt-6 mt-4 w-full py-3 rounded bg-blue-600 text-white font-medium"
          >
            {isAlreadyEnrolled ? "Already Enrolled" : "Enroll Now"}
          </button>

          <div className="pt-6">
            <p className="md:text-xl text-lg font-medium text-gray-800">
              What's in the course?
            </p>
            <ul className="ml-4 pt-2 text-sm md:text-default list-disc text-gray-500">
              <li>Lifetime access with free updates.</li>
              <li>Step-by-step, hands-on project guidance.</li>
              <li>Downloadable resources and source code.</li>
              <li>Quizzes to test your knowledge.</li>
              <li>Certificate of completion.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default CourseDetails;
