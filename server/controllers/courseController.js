import Course from "../models/Course.js";

// Get all courses
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true })
      .select(["-courseContent", "-enrolledStudents"])
      .populate({ path: "educator" });

    res.json({ success: true, courses });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Get Course by ID
export const getSingleCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const courseData = await Course.findById(id).populate({ path: "educator" });

    // removelectureUrl if isPreview is false
    courseData.courseContent.forEach((chapter) => {
      chapter.chapterContent.forEach((lecture) => {
        if (!lecture.isPreviewFree) {
          lecture.lectureUrl = "";
        }
      });
    });

    res.json({ success: true, courseData });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
