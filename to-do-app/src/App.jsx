
import ToDoForm from './components/ToDoForm'
import ToDoList from './components/ToDoList'
import { useState,Fragment,createContext} from 'react'

export const TodoContext=createContext();
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
    <TodoContext.Provider value={{taskList,toggleTaskDone}}>{<ToDoList/>}</TodoContext.Provider>
    </Fragment>
  )
}

export default App
