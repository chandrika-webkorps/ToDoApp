import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
const app = express();
import toDoRoute from "./Routes/todoRoute.js";
import authRoute from "./Routes/authRoute.js";
app.use(express.json());
// const allowedOrigins=["https://todoapp-2-1.onrender.com","http://localhost:5173"]
app.use(cors({
    origin: "https://todoapp-2-1.onrender.com",
    credentials:true
}));
app.use("/", authRoute);
app.use("/api", toDoRoute);


export default app