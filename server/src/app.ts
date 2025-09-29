import dotenv from "dotenv";
dotenv.config();
import express from "express"
import cors from "cors";
import mongoose from "mongoose";
const app=express()
import toDoRoute from "./Routes/todoRoute.js"
import authRoute from "./Routes/authRoute.js"

app.use(express.json())
const allowedOrigins=["https://todoapp-2-1.onrender.com/login","http://localhost:5173"]
app.use(cors({
    origin: allowedOrigins,
    credentials:true
}));
app.use("/",authRoute)
app.use("/api",toDoRoute)

// app.listen(process.env.PORT,()=>{
//     console.log(`server running on http://localhost:${process.env.PORT}`);
    
// })

// if (!process.env.MONGO_URI) {
//     throw new Error("MONGO_URI environment variable is not defined");
// }
// mongoose.connect(process.env.MONGO_URI as string)
// .then(()=>console.log("connected to db"))
// .catch(err=>console.log("error connecting to db",err))
export default app