import express from "express";
import {
  addCourse,
  updatRoleToEducator,
} from "../controllers/educatorController.js";
import upload from "../config/multer.js";
import { protectEduactor } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/update-role", updatRoleToEducator);
router.post("/add-course", upload.single("image"), protectEduactor, addCourse);

export default router;
