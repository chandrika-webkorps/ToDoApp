import {React,useState} from 'react'

function ToDoList(props) {
    let allTasks=props.tasks?props.tasks:[]
    const sortedTasks=[...allTasks].sort((a,b)=>a.done - b.done)
    
    return (
    <div>
       <ul>
        {sortedTasks.map((task)=>(
            <li key={task.id}>
                <div className={`${task.done?"bg-green-300":"bg-blue-300"} mt-4 shadow-md mx-auto max-w-2xl rounded-md`}>
                <h2 className={`text-2xl ${task.done ? 'text-green-800 line-through' : 'text-blue-900'} font-bold m-4`}>{task.title}</h2>
                <p className={`${task.done?"text-green-700 line-through":"text-white"} m-4`}>{task.description}</p>
                <button 
                type='button' className='bg-gray-500 text-white px-4 py-2 rounded m-4 shadow-md'
                onClick={()=>props.onToggleDone(task.id)}>{task.done?"Marked Done":"Mark As Done"}
                </button>
               </div>
            </li>
        ))}
       </ul>
      
    </div>
  )
}

export default ToDoList
