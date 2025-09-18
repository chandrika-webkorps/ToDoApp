import {create} from 'zustand';

export const useTodoStore=create((set)=>({
    taskList:[],
    recieveTask:(task)=>set((state)=>({...state,taskList:[...state.taskList,{...task,done:false,id:Date.now()}]})),

    toggleTasks:(taskId)=>set((state)=>(
        {taskList:state.taskList.map((task)=>task.id===taskId?{...task,done:!(task.done)}:task
    
    )}))
}))