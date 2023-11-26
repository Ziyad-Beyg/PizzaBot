import mongoose from "mongoose";

// DB Connection Function
const ConnectDB = async (server) => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    console.log(
      "DB Connected Successfully: ",
      connection.connection.name,
      connection.connection.host
    );

    if (connection) {
      // Server Invoking Function
      server.app.listen(server.PORT, () => {
        console.log(`SERVER LISTENING ON PORT ${server.PORT}`);
      });
    }
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

export default ConnectDB;
