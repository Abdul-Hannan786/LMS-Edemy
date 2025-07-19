import { clerkClient } from "@clerk/express";
import Course from "../models/Course.js";
import Purchase from "../models/Purchase.js";
import User from "../models/User.js";

// Update role to educator
export const updatRoleToEducator = async (req, res) => {
  try {
    const userId = req.auth().userId;
    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        role: "educator",
      },
    });

    res.json({ success: true, message: "Now you can publish courses" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Add New Course
export const addCourse = async (req, res) => {
  try {
    const { courseData } = req.body;
    const imageFile = req.file;
    const educatorId = req.auth().userId;

    if (!imageFile) {
      return res.json({ success: false, message: "Thumbnail not attached" });
    }

    const parsedCourseData = JSON.parse(courseData);
    parsedCourseData.educator = educatorId;
    parsedCourseData.courseThumbnail = imageFile.path;

    const newCourse = await Course.create(parsedCourseData);

    res.json({ success: true, message: "Course added successfully" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Get educator courses
export const getEducatorCourses = async (req, res) => {
  try {
    const educator = req.auth().userId;

    const courses = await Course.find({ educator });

    res.json({ success: true, courses });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Get Educator Dashboard Data (Total Earning, Enrolled Students, No. of Courses)
export const educatorDashboardData = async (req, res) => {
  try {
    const educator = req.auth().userId;

    // Total courses
    const courses = await Course.find({ educator });
    const totalCourses = courses.length;

    // Total earnings
    const courseIds = courses.map((course) => course._id);
    const purchases = await Purchase.find({
      courseId: { $in: courseIds },
      status: "completed",
    });
    const totalEarnings = purchases.reduce(
      (sum, purchase) => sum + purchase.amount,
      0
    );

    // Collect unique enrolled students IDs with their course Title
    const enrolledStudentsData = [];
    for (const course of courses) {
      const students = await User.find(
        {
          _id: { $in: course.enrolledStudents },
        },
        "name imageUrl"
      );

      students.forEach((student) => {
        enrolledStudentsData.push({
          courseTitle: course.courseTitle,
          student,
        });
      });
    }

    res.json({
      success: true,
      dashboardData: { totalEarnings, enrolledStudentsData, totalCourses },
    });
  } catch (error) {}
  console.log(error.message);
  res.json({ success: false, message: error.message });
};

// Get enrolled student data with purchase data
export const getEnrolledStudentsData = async (req, res) => {
  try {
    const educator = req.auth().userId;
    const courses = await Course.find({ educator });
    const courseIds = courses.map((course) => course._id);

    const purchases = await Purchase.find({
      courseId: { $in: courseIds },
      status: "completed",
    })
      .populate("userId", "name, imageUrl")
      .populate("courseId", "coursetitle");

    const enrolledStudents = purchases.map((purchase) => ({
      student: purchase.userId,
      courseTitle: purchase.courseId.coursetitle,
      purchaseDate: purchase.createdAt,
    }));

    res.json({ success: true, enrolledStudents });
  } catch (error) {}
  console.log(error.message);
  res.json({ success: false, message: error.message });
};
