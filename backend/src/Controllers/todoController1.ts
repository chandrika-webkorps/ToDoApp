import type { Request, Response } from 'express'
import * as path from "path"
import * as fs from "fs/promises"
import { fileURLToPath } from 'url'


function getDirname(importMetaUrl:string){
    const filename=fileURLToPath(importMetaUrl)
    return path.dirname(filename)
}

const __dirname=getDirname(import.meta.url)
const filePath=path.join(__dirname, '..',"ToDo.json")
type Task={
    title:string,
    description:string,
    id:number,
    done:boolean
}
export const addTask=async(req:Request,res:Response)=>{
   const values:Task=req.body
   console.log("typescript: ",values);
   try{
    let data=""
    let jsonData:Task[]=[]
    try{
      data= await fs.readFile(filePath,"utf-8")
      jsonData=JSON.parse(data)

    }catch(err:any){
        if(err.code==="ENOENT"){
            console.log("File not found! Creating a new one.");
            await fs.writeFile(filePath, JSON.stringify([], null, 2), "utf-8")
        }
    }
    jsonData.push(values)
    await fs.writeFile(filePath,JSON.stringify(jsonData,null,2),"utf-8")
    return res.status(200).json({message:"New Task added", allTasks:jsonData})
   }catch(err){
    return res.status(500).json({message:"Internal Server Error"})
   }
   
}

export const toggleTask=async(req:Request,res:Response)=>{
    
       const {id,done}=req.body as {id:number,done:boolean}
       try{
        const jsonData=await fs.readFile(filePath,"utf-8")
        const parsedData:Task[]=JSON.parse(jsonData)
        const updatedData:Task[]=parsedData.map((task:Task)=>{
            if(task.id===id){
              return {...task,done:!done}
            }
            return task
        })
        await fs.writeFile(filePath,JSON.stringify(updatedData,null,2),"utf-8")
        return res.status(200).json({message:"Updated task list is: ",updatedData})
    }catch(err){
        return res.status(500).json({message:"Something went wrong",details:err})
    }
}

export const getTasks=async(req:Request,res:Response)=>{
    try{
        const jsonData=await fs.readFile(filePath,"utf-8")
        const parsedData:Task[]=JSON.parse(jsonData)
        return res.status(200).json({Message:"Fetching all tasks: ",allTasks:parsedData})
    }catch(err){
        return res.status(500).json({message:"Internal server error",details:err})
    }
}

export const deleteTask=async(req:Request,res:Response)=>{
    const {id}=req.params as {id:number|string}
    try{
        const jsonData=await fs.readFile(filePath,"utf-8")
        const parsedData:Task[]=JSON.parse(jsonData)
        const dataAfterDelete:Task[]=parsedData.filter((task)=>String(task.id)===String(id))
        await fs.writeFile(filePath,JSON.stringify(dataAfterDelete,null,2),"utf-8")
    }catch(err){
        console.log("Error deleting task: ",err);
        return res.status(500).json({message:"Error deleting task from todos ",details:err})
        
    }
}