import { useContext,useRef} from 'react'
import {TodoContext} from '../App'
import { useTodoStore } from '../store/to-do-state'
function ToDoList() {
  const ctx=useContext(TodoContext)
  const {setTaskToEdit,updateTaskList}=useTodoStore()
    let allTasks=ctx.taskList?ctx.taskList:[]
    const sortedTasks=[...allTasks].sort((a,b)=>a.done - b.done)
    const dragTask=useRef(0)
    const draggedTaskOver=useRef(0)
    
    function handleSort(){
      const taskClone=[...sortedTasks]
      const temp=taskClone[dragTask.current]
      taskClone[dragTask.current]=taskClone[draggedTaskOver.current]
      taskClone[draggedTaskOver.current]=temp
      updateTaskList(taskClone)
    }
    return (
    <div>
       <ul>
        {sortedTasks.map((task,index)=>(
            <li key={task.id}>
                <div className={`${task.done?"bg-green-300":"bg-blue-300"} mt-4 shadow-md mx-auto max-w-2xl rounded-md`} draggable="true"
                onDragStart={()=>(dragTask.current=index)}
                onDragEnter={()=>(draggedTaskOver.current=index)}
                onDragEnd={handleSort}>
                <h2 className={`text-2xl ${task.done ? 'text-green-800 line-through' : 'text-blue-900'} font-bold m-4`}>{task.title}</h2>
                <div className="flex">
                <p className={`${task.done?"text-green-700 line-through":"text-white"} m-4`}>{task.description}</p>
                <button type="button" id="deleteTask" className='m-3 bg-red-400 p-1 rounded-md' style={{cursor:"pointer"}} onClick={()=>ctx.deleteTask(task.id)}>Delete</button>
                <button type='button' id="editTask" className='m-3 bg-green-500 p-1 rounded-md' style={{cursor:"pointer"}} onClick={()=>setTaskToEdit(task)}>Edit</button>
                </div>
                <button 
                type='button' className='bg-gray-500 text-white px-4 py-2 rounded m-4 shadow-md'
                onClick={()=>ctx.toggleTasks(task.id)}>{task.done?"Marked Done":"Mark As Done"}
                </button>
               </div>
            </li>
        ))}
       </ul>
      
    </div>
  )
}

export default ToDoList
