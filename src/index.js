import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import path from "path";

import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import bodyParser from "body-parser";
import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT;
const __dirname = path.resolve();


app.use(bodyParser.json({ limit: '40mb' }));
app.use(bodyParser.urlencoded({ limit: '40mb', extended: true }));

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://chat-app-frontend-seven-tau.vercel.app"], 
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);



server.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});


// server.listen(5001, () => {
//   console.log("server is running on PORT:" + PORT);
//   connectDB();
// });
