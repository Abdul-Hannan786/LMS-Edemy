import express from "express";
import cors from "cors";
import dotenv from "dotenv/config";
import connectDB from "./config/db.js";
import { clerkWebHooks } from "./controllers/webhooks.js";
import educatorRouter from "./routes/educatorRoutes.js";
import { clerkMiddleware } from "@clerk/express";
import connectCloudinary from "./config/cloudinary.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

app.get("/", (req, res) => res.send("Hello World"));
app.post("/clerk", clerkWebHooks);
app.use("/api/educator", educatorRouter);

await connectCloudinary();
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`⚙️  Server is running at port : ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO DB connection failed !!! ", err);
  });
