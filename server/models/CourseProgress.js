import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const courseProgressSchema = new Schema(
  {
    userId: { type: String, required: true },
    courseId: { type: String, required: true },
    completed: { type: Boolean, default: false },
    lectureCompleted: [],
  },
  { minimize: false }
);

const CourseProgress = mongoose.model("CourseProgress", courseProgressSchema);
export default CourseProgress;
