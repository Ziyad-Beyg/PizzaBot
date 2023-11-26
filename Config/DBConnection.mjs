import mongoose from "mongoose";

// DB Connection Function
const ConnectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    console.log(
      "DB Connected Successfully: ",
      connection.connection.name,
      connection.connection.host
    );
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

export default ConnectDB;
