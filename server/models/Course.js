import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const courseSchema = new Schema(
  {
    courseTitle: { type: String, required: true },
    courseDescription: { type: String, required: true },
    courseThumbnail: { type: String, required: true },
    coursePrice: { type: Number, required: true },
    isPublished: { type: Boolean, default: true },
    discount: { type: Number, required: true, min: 0, max: 100 },
    courseContent: [],
    courseRatings: [
      {
        userId: { type: String },
        rating: { type: Number, min: 1, max: 5 },
      },
    ],
    educator: { type: ObjectId, ref: "Users", required: true },
    enrolledStudents: [{ type: ObjectId, ref: "Users" }],
  },
  { timestamps: true, minimize: false }
);

const Course = mongoose.model("Courses", courseSchema);
export default Course;
