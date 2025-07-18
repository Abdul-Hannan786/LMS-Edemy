import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // const connectionInstance = await mongoose.connect(
    //   `${process.env.MONGODB_URI}/Edemy-LMS`
    // );
    // console.log(`\n MongoDB connected`);

    mongoose.connection.on("connected", () =>
      console.log("Database Connected")
    );

    await mongoose.connect(`${process.env.MONGODB_URI}/Edemy-LMS`);
  } catch (error) {
    console.log("MONGODB connection FAILED ", error);
    process.exit(1);
  }
};

export default connectDB;
