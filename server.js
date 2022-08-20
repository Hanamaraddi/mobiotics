import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import authRoute from "./routes/auth-routes.js";
import userRoute from "./routes/user-routes.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();
const port = process.env.PORT || 5000;
const db = process.env.DATABASE;

mongoose.connect(db).then(() => {
  console.log("DB is Connected");
});

//MIDDLEWARES

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/", authRoute);
app.use("/users", userRoute);

// app.get("/", (req, res) => {
//   res.status(200).json("Hello World");
// });

app.listen(port, () => {
  console.log(`Server is Running on Port ${port}`);
});
