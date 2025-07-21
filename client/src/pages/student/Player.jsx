/* eslint-disable react-hooks/exhaustive-deps */
import { assets } from "@/assets/assets";
import Loading from "@/components/student/Loading";
import Rating from "@/components/student/Rating";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { useAppContext } from "@/context/AppContext";
import axios from "axios";
import humanizeDuration from "humanize-duration";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";

const Player = () => {
  const {
    calculateChapterTime,
    enrolledCourses,
    getToken,
    userData,
    fetchUserEnrolledCourses,
  } = useAppContext();
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [playerData, setPlayerData] = useState(null);
  const [progressData, setProgressData] = useState(null);
  const [initialRating, setInitialRating] = useState(0);

  const getCourseData = () => {
    enrolledCourses.map((course) => {
      if (course._id === courseId) {
        setCourseData(course);

        course.courseRatings.map((item) => {
          if (item.userId === userData._id) {
            setInitialRating(item.rating);
          }
        });
      }
    });
  };

  const markLectureAsCompleted = async (lectureId) => {
    try {
      const token = await getToken();
      const { data } = await axios.post(
        "/api/user/update-course-progress",
        {
          courseId,
          lectureId,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        toast.success(data.message);
        getCourseProgress();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getCourseProgress = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.post(
        "/api/user/get-course-progress",
        { courseId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        setProgressData(data.progressData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleRate = async (rating) => {
    try {
      const token = await getToken();
      const { data } = await axios.post(
        "/api/user/add-rating",
        {
          courseId,
          rating,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        toast.success(data.message);
        fetchUserEnrolledCourses();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getCourseProgress();
  }, []);

  useEffect(() => {
    if (enrolledCourses.length > 0) {
      getCourseData();
    }
  }, [enrolledCourses]);

  return courseData ? (
    <div className="p-6 sm:p-12 sm:pb-28 flex flex-col-reverse md:grid md:grid-cols-2 gap-10 md:px-36">
      {/* Left Column */}
      <div className="text-gray-800">
        <h2 className="text-2xl font-semibold">Course Structure</h2>
        <div className="pt-5">
          <div className="max-w-4xl mx-auto space-y-4">
            <Accordion
              type="single"
              collapsible
              className="w-full shadow-xl md:shadow-2xl p-5 rounded-xl"
            >
              {courseData &&
                courseData.courseContent.map((chapter, index) => (
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
                        {chapter.chapterContent.map((lecture, i) => (
                          <div
                            key={i}
                            className="flex justify-between items-center"
                          >
                            <span className="flex items-center gap-2">
                              <img
                                loading="lazy"
                                src={
                                  progressData &&
                                  progressData.lectureCompleted.includes(
                                    lecture.lectureId
                                  )
                                    ? assets.blue_tick_icon
                                    : assets.play_icon
                                }
                                alt="play icon"
                                className="w-4 h-4 mt-1 cursor-pointer"
                              />{" "}
                              {lecture.lectureTitle}
                            </span>
                            <span className="text-sm flex gap-2">
                              {/* Preview 12 hours */}
                              {lecture.lectureUrl && (
                                <span
                                  onClick={() =>
                                    setPlayerData({
                                      ...lecture,
                                      chapter: index + 1,
                                      lecture: i + 1,
                                    })
                                  }
                                  className="text-sm text-blue-600 cursor-pointer"
                                >
                                  Watch
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

        <div className="flex items-center gap-2 py-3 mt-10">
          <h1 className="text-xl font-bold">Rate this course:</h1>
          <Rating initiallRating={initialRating} onRate={handleRate} />
        </div>
      </div>

      {/* Right Column */}
      <div className="md:mt-10">
        {playerData ? (
          <div>
            <YouTube
              videoId={playerData.lectureUrl.split("/").pop()}
              iframeClassName="w-full aspect-video"
            />
            <div className="flex justify-between items-center mt-1">
              <p>
                {playerData.chapter}.{playerData.lecture}{" "}
                {playerData.lectureTitle}
              </p>
              <button
                onClick={() => markLectureAsCompleted(playerData.lectureId)}
                className="text-blue-600"
              >
                {progressData &&
                progressData.lectureCompleted.includes(playerData.lectureId)
                  ? "Completed"
                  : "Mark Complete"}
              </button>
            </div>
          </div>
        ) : (
          <img
            src={courseData ? courseData.courseThumbnail : ""}
            loading="lazy"
            className="rounded-lg"
            alt="course thumbnail"
          />
        )}
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Player;
