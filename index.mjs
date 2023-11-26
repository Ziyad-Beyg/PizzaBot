import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import ConnectDB from "./Config/DBConnection.mjs";
import { router as OrderRouter } from "./Routes/OrderRoutes.mjs";

// Environment Variables Configured
dotenv.config();

// Express Server Declared
const app = express();
// Defined PORT for Sever
const PORT = process.env.PORT || 8080;

// MiddleWares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ROUTES
app.use("/", OrderRouter);

// Function for Database Connection
ConnectDB().then(() => {
  // Server Invoking Function
  app.listen(PORT, () => {
    console.log(`SERVER LISTENING ON PORT ${PORT}`);
  });
});
