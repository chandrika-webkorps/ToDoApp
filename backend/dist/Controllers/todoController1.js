import * as path from "path";
import * as fs from "fs/promises";
import { fileURLToPath } from 'url';
import { UserModel } from "../Models/userModel.js";
import { ToDoModel } from "../Models/todoModel.js";
import mongoose from "mongoose";
function getDirname(importMetaUrl) {
    const filename = fileURLToPath(importMetaUrl);
    return path.dirname(filename);
}
const __dirname = getDirname(import.meta.url);
const filePath = path.join(__dirname, '..', "ToDo.json");

export const addTask = async (req, res) => {
    const values = req.body;
    const userId=new mongoose.Types.ObjectId(req.user.id)
    const user=await UserModel.findById(userId)
    if(!user){
        return res.status(404).json({message:"User not found! "})
        
    }
    try {
        if(!values.title||!values.description){
            return res.status(404).json({message:"Title or description missing"})
        }
        const newTask=new ToDoModel({
            title:values.title,
            description:values.description,
            userId
        })
        await newTask.save()
        return res.status(200).json({ message: "New Task added", newTask });
    }
    catch (err) {
           
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
export const toggleTask = async (req, res) => {
    const { id, done } = req.body;
    const userId=new mongoose.Types.ObjectId(req.user.id)
    console.log("userID: ",userId);
    
    const user=await UserModel.findById(userId)
     if(!user){
        return res.status(404).json({message:"User not found! "})
    }
    try {
        const taskToToggle=await ToDoModel.findById(id)
        console.log("toggleTask: ",taskToToggle);
        
        taskToToggle.done=done;
        await taskToToggle.save()
        return res.status(200).json({ message: "Updated task list is: ", taskToToggle});
    }
    catch (err) {
        return res.status(500).json({ message: "Something went wrong", details: err });
    }
};
export const getTasks = async (req, res) => {
    const userId=new mongoose.Types.ObjectId(req.user.id)
    console.log("userID: ",userId);
    
    const user=await UserModel.findById(userId)
     if(!user){
        return res.status(404).json({message:"User not found! "})
    }
    try {
        const allTasks=await ToDoModel.find({userId})
        return res.status(200).json({ Message: "Fetching all tasks: ", allTasks });
    }
    catch (err) {
        return res.status(500).json({ message: "Internal server error", details: err });
    }
};
export const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const taskToDelete=await ToDoModel.findByIdAndDelete(id)
        console.log("taskto delete: ",taskToDelete);
        
        if(!taskToDelete){
            return res.status(404).json({Message:"Task not found"})
        }
        return res.status(200).json({message:"Task deleted successfully"})
    }catch (err) {
        console.log("Error deleting task: ", err);
        return res.status(500).json({ message: "Error deleting task from todos ", details: err });
    }
};

export const editTask=async(req,res)=>{
    const {id}=req.params
    const values=req.body
    console.log("task id: ",id);
    console.log("Values: ",values);
    
    
   const userId=new mongoose.Types.ObjectId(req.user.id)
    console.log("userID: ",userId);
    
    const user=await UserModel.findById(userId)
     if(!user){
        return res.status(404).json({message:"User not found! "})
    }
    try{
         const taskToEdit=await ToDoModel.findById(id)
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
