import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const purchaseSchema = new Schema(
  {
    courseId: { type: ObjectId, ref: "Courses", required: true },
    userId: { type: String, ref: "Users", required: true },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Purchase = mongoose.model("Purchases", purchaseSchema);
export default Purchase;
