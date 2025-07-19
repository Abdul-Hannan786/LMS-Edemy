import express from "express";
import {
  getUserData,
  purchaseCourse,
  userEnrolledCourse,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/data", getUserData);
router.get("/enrolled-courses", userEnrolledCourse);
router.post("/purchase", purchaseCourse);

export default router;
