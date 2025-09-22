const express=require('express');
const cors=require('cors');
const app=express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173" 
}));

const todoRoute=require("./Routes/todoRoute")


app.use("/api",todoRoute)

app.listen(3000,()=>{
    console.log("Server is running!");
    
})