
import ToDoForm from './components/ToDoForm'
import ToDoList from './components/ToDoList'
import { Fragment,createContext, useEffect} from 'react'
import { useTodoStore } from './store/to-do-state';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import axios from 'axios';
import LoginForm from './components/LoginForm';
import SignupForm from "./components/SignupForm"
const BASE_URL="http://localhost:8080"
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
    <BrowserRouter>
    <Fragment>
    <Routes>
      <Route path="/" element={<SignupForm/>}/>
      <Route path="/login" element={<LoginForm />} />
   
      <Route path="/todo" element={
        <TodoContext.Provider value={{taskList,toggleTasks,deleteTask}}>
        <ToDoForm recieveTask={recieveTask}/>
          {<ToDoList/>}
          </TodoContext.Provider>
        }
          />

    </Routes>
    </Fragment>

    </BrowserRouter>
  )
}

export default App
