import express from "express";
import {
  addCourse,
  educatorDashboardData,
  getEducatorCourses,
  getEnrolledStudentsData,
  updatRoleToEducator,
} from "../controllers/educatorController.js";
import upload from "../config/multer.js";
import { protectEduactor } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/update-role", updatRoleToEducator);
router.post("/add-course", upload.single("image"), protectEduactor, addCourse);
router.get("/courses", protectEduactor, getEducatorCourses);
router.get("/dashboard", protectEduactor, educatorDashboardData);
router.get("/enrolled-students", protectEduactor, getEnrolledStudentsData);

export default router;
