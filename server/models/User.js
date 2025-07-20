import mongoose from "mongoose";
 
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const userSchema = new Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    imageUrl: { type: String, required: true },
    enrolledCourses: [
      {
        type: ObjectId,
        ref: "Courses",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("Users", userSchema);
export default User;