/* eslint-disable no-constant-condition */
/* eslint-disable react-hooks/exhaustive-deps */
import { assets } from "@/assets/assets";
import Rating from "@/components/student/Rating";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { useAppContext } from "@/context/AppContext";
import humanizeDuration from "humanize-duration";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";

const Player = () => {
  const { calculateChapterTime, enrolledCourses } = useAppContext();
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [playerData, setPlayerData] = useState(null);

  const getCourseData = () => {
    const course = enrolledCourses.find((course) => course._id === courseId);
    setCourseData(course);
  };

  useEffect(() => {
    getCourseData();
  }, [enrolledCourses]);

  return (
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
                                  false
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
          <Rating initailRating={0} />
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
              <button className="text-blue-600">
                {false ? "completed" : "Mark Complete"}
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
  );
};

export default Player;
