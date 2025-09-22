const fs=require('fs').promises
const path=require('path')
const filePath=path.join(__dirname, '..',"ToDo.json")

const addTask=async(req,res)=>{
  const values=req.body
  console.log(values);
  
  try{
    let data=[],jsonData=[]
    try{
    data=await fs.readFile(filePath,'utf-8')
    jsonData=JSON.parse(data)

    }catch(err){
        if(err.code==='ENOENT'){
            console.log("File not found! Creating a new one.");
            await fs.writeFile(filePath,JSON.stringify([],null,2),"utf-8")
        }  
    }
    jsonData.push(values)
    
    await fs.writeFile(filePath,JSON.stringify(jsonData,null,2),'utf-8')
    return res.status(200).json({message:"Task added successfully",allTasks:jsonData})
    
  }catch(err){
    return res.status(500).json({message:"Internal Server Error"})
  }
}

const toggleTask=async(req,res)=>{
    const{id,done}=req.body
    
    try{
        let jsonData=await fs.readFile(filePath,"utf-8")
        const parsedData=JSON.parse(jsonData)
        console.log(JSON.parse(jsonData));
        const updatedData=parsedData.map((task)=>{
            if(task.id===id){
                return{...task,done:done}
            }
            return task
        })

        await fs.writeFile(filePath,JSON.stringify(updatedData,null,2),'utf-8')
        
        return res.status(200).json({message:"Task Toggled successfully",allTasks:jsonData})
    }catch(err){
        return res.status(500).json({message:"Internal Server Error",details:err})
        
    }
}

const getTasks=async(req,res)=>{
    try{
        let jsonData=await fs.readFile(filePath,"utf-8")
        const parsedData=JSON.parse(jsonData)
        return res.status(200).json({allTasks:parsedData})

    }catch(err){
        return res.status(500).json({message:"Internal Server Error: ",details:err})
        
    }
}

const deleteTask=async(req,res)=>{
    try{
        const taskId=req.params.id
        
        let jsonData=await fs.readFile(filePath,"utf-8")
        const parsedData=JSON.parse(jsonData)
        const updatedData=parsedData.filter((task)=>String(task.id)!==String(taskId))
       
        await fs.writeFile(filePath,JSON.stringify(updatedData,null,2),"utf-8")
        return res.status(200).json({message:"Task deleted successfully",allTasks:updatedData})
    }catch(err){
        return res.status(500).json({message:"internal server error",details:err})
    }
}

const editTask=async(req,res)=>{
    try{
   
    const taskId=req.params.id
    const updatedTask=req.body
    const jsonData=await fs.readFile(filePath,"utf-8")
    const parsedData=JSON.parse(jsonData)
    const updatedData=parsedData.map((task)=>{
        if(String(task.id)===String(taskId)){
            return{...task,...updatedTask}
        }
        return task
    })
    await fs.writeFile(filePath,JSON.stringify(updatedData,null,2),"utf-8")
    return res.status(200).json({message:"Task edited successfully",allTasks:updatedData})
}catch(err){
    return res.status(500).json({message:"Internal Server Error",details:err})
}
}
module.exports={addTask,
    toggleTask,
    getTasks,
    deleteTask,
    editTask
}