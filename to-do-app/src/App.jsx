
import ToDoForm from './components/ToDoForm'
import ToDoList from './components/ToDoList'
import { Fragment,createContext} from 'react'
import { useTodoStore } from './store/to-do-state';

export const TodoContext=createContext();
function App() {
  const{taskList,recieveTask,toggleTasks}=useTodoStore()
   
  return (
    <Fragment>
    <ToDoForm recieveTask={recieveTask}/>
    <TodoContext.Provider value={{taskList,toggleTasks}}>{<ToDoList/>}</TodoContext.Provider>
    </Fragment>
  )
}

export default App
