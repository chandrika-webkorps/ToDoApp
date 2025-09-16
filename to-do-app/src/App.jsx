
import ToDoForm from './components/ToDoForm'
import ToDoList from './components/ToDoList'
import { useState,Fragment} from 'react'

function App() {
  const[taskList,setTaskList]=useState([])
  const onRecievingTask=(task)=>{
    setTaskList((prevTaskList)=> [...prevTaskList,{...task,done:false,id:Date.now()}])
  }
 
  //setting tasks as done
  const toggleTaskDone=(taskId)=>{
    setTaskList((prevTasks)=>{
      return prevTasks.map((task)=>task.id===taskId?{...task, done:!(task.done)}:task)
    })
    
  }
  
  
  return (
    <Fragment>
    <ToDoForm recieveTask={onRecievingTask}/>
    <ToDoList tasks={taskList} onToggleDone={toggleTaskDone}/>
    </Fragment>
  )
}

export default App
