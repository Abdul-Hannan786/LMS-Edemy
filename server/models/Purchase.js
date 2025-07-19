import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const purchaseSchema = new Schema(
  {
    courseId: { type: ObjectId, ref: "Courses", requireed: true },
    userId: { type: ObjectId, ref: "Users", requireed: true },
    amount: { type: Number, requireed: true },
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
