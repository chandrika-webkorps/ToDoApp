
import ToDoForm from './components/ToDoForm'
import ToDoList from './components/ToDoList'
import { Fragment,createContext, useEffect} from 'react'
import { useTodoStore } from './store/to-do-state';
import axios from 'axios';
const BASE_URL="http://localhost:3000"
export const TodoContext=createContext();
function App() {
  let{taskList,recieveTask,toggleTasks,deleteTask,setTaskList}=useTodoStore()
  
  useEffect(()=>{
    const fetchTasks=async()=>{
      try{
          const res=await axios.get(`${BASE_URL}/api/get-tasks`)
          setTaskList(res.data.allTasks)          
      }catch(err){
          console.log("Error fetching tasks",err);
      }
    }
    fetchTasks()
  },[])
   
  return (
    <Fragment>
    <ToDoForm recieveTask={recieveTask}/>
    <TodoContext.Provider value={{taskList,toggleTasks,deleteTask}}>{<ToDoList/>}</TodoContext.Provider>
    </Fragment>
  )
}

export default App
