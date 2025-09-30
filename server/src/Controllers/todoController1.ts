import type { Request, Response } from 'express'
import {TodoModel} from "../Models/todoModel.js"
import {UserModel} from "../Models/userModel.js"
import mongoose from 'mongoose'

type Task={
    title:string,
    description:string,
    id:number,
    done:boolean
}
export const addTask=async(req:Request,res:Response)=>{
   const values:Task=req.body
   console.log("typeOf req.user: ",typeof req.user);
   
   if (!req.user || typeof req.user === "string") {
    return res.status(401).json({ message: "Unauthorized" });
}
   console.log("Req.user: ",req.user);

   const userId :any= new mongoose.Types.ObjectId(req.user.id as string)
   const user:any=await UserModel.findById(userId)
   if(!user){
       return res.status(404).json({message:"User not found"})
    }
    console.log("user found: ",user);
   try{
    if(!values.title||!values.description){
         return res.status(400).json({message:"Title or description missing"})
    }
    const newTask:any=new TodoModel({
        title:values.title as string,
        description:values.description as string,
        userId :userId
    })
    await newTask.save()
    return res.status(200).json({message:"New Task added", newTask})
   }catch(err){
    return res.status(500).json({message:"Internal Server Error",details:err})
   }
   
}

export const toggleTask = async (req:Request, res:Response) => {
    if (!req.user || typeof req.user === "string") {
    return res.status(401).json({ message: "Unauthorized" });
}
    const { id, done } = req.body as {id:any, done:boolean};
    const userId=new mongoose.Types.ObjectId(req.user.id as string)
   
    const user=await UserModel.findById(userId)
     if(!user){
        return res.status(404).json({message:"User not found! "})
    }
    try {
        const taskToToggle=await TodoModel.findById(id)     
        if(!taskToToggle){
           return res.status(404).json({message:"Task not found"})
        }  
        taskToToggle.done=done
        await taskToToggle.save()
        return res.status(200).json({ message: "Updated task list is: ", taskToToggle});
    }
    catch (err) {
        return res.status(500).json({ message: "Something went wrong", details: err });
    }
};
export const getTasks = async (req:Request, res:Response) => {
    if (!req.user || typeof req.user === "string") {
    return res.status(401).json({ message: "Unauthorized" });
}
    const userId=new mongoose.Types.ObjectId(req.user.id)  
    const user=await UserModel.findById(userId)
     if(!user){
        return res.status(404).json({message:"User not found! "})
    }
    try {
        const allTasks=await TodoModel.find({userId})
        return res.status(200).json({ Message: "Fetching all tasks: ", allTasks });
    }
    catch (err) {
        return res.status(500).json({ message: "Internal server error", details: err });
    }
};

export const deleteTask = async (req:Request, res:Response) => {
    const { id } = req.params;
    
    try {
        const taskToDelete=await TodoModel.findByIdAndDelete(id)       
        if(!taskToDelete){
            return res.status(404).json({Message:"Task not found"})
        }
        return res.status(200).json({message:"Task deleted successfully"})
    }catch (err) {
        return res.status(500).json({ message: "Error deleting task from todos ", details: err });
    }
};

export const editTask=async(req:Request,res:Response)=>{
    const {id}=req.params
    const values=req.body
    if (!req.user || typeof req.user === "string") {
    return res.status(401).json({ message: "Unauthorized" });
}
      
   const userId=new mongoose.Types.ObjectId(req.user.id as string)
    
    const user=await UserModel.findById(userId)
     if(!user){
        return res.status(404).json({message:"User not found! "})
    }
    try{
         const taskToEdit=await TodoModel.findById(id)
         console.log("Task to edit is: ",taskToEdit);
         if(!taskToEdit){
            return res.status(404).json({Message:"Task not found"})
         }
         taskToEdit.title=values.title
         taskToEdit.description=values.description
         await taskToEdit.save()
        
         return res.status(200).json({message:"Task edited successfully",updatedTask:taskToEdit})
    }catch(err){
        console.log("Error Editing task: ",err);
        
        return res.status(500).json({message:"Error editing task: ",err})
    }
}
