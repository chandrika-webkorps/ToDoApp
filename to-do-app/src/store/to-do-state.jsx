import {create} from 'zustand';

export const useTodoStore=create((set)=>({
    taskList:[], taskToEdit:null,

    //adding new task
    recieveTask:(task)=>set((state)=>({taskList:[...state.taskList,{...task,done:false,id:Date.now()}]})),

    //setting tasks as done
    toggleTasks:(taskId)=>set((state)=>(
        {taskList:state.taskList.map((task)=>task.id===taskId?{...task,done:!(task.done)}:task
    )})),

    //deleting a task
    deleteTask:(taskId)=>set((state)=>({
        taskList:[...state.taskList.filter((task)=>task.id!==taskId)]
    })),

    //editing a task
   setTaskToEdit:(task)=>set({taskToEdit:task}),

   updateTask:(updatedTask)=>set((state)=>({taskList:state.taskList.map((task)=>task.id===updatedTask.id?updatedTask:task),
    taskToEdit:null
   }))
}))