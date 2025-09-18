import {React,Fragment, use, useEffect,useState} from 'react'
import {Form,Field,Formik} from "formik"
import { useTodoStore } from '../store/to-do-state'

function ToDoForm(props) {
  const{updateTask,taskToEdit}=useTodoStore()
  
    const initialValues={
        title:taskToEdit?taskToEdit.title:"",
        description:taskToEdit?taskToEdit.description:""
    }


    const formSubmitHandler=(values,{resetForm})=>{
        if(taskToEdit){
         updateTask({...taskToEdit,...values})
        }else{
          props.recieveTask(values)

        }
        resetForm()
    }

    
  return (
    <Fragment>
      <h1 className="text-2xl max-w-sm mx-auto">My ToDos</h1>
      <div className="max-w-3xl mx-auto mt-10 p-5 h-[100px] border rounded ">
      <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      onSubmit={formSubmitHandler}>
        <Form>
           <div className="flex mx-auto max-w-lg gap-3">
            <label htmlFor="title" className="font-bold">Title:</label> <br />
            <Field type="text" name="title" id="title" className="border"/>
            
            <label htmlFor="description" className="font-bold ml-3">Description:</label> <br />
            <Field type="text" name="description" id="description" className="border"/> <br />
            </div>
        
            <button type="submit" className="bg-blue-500 text-white p-1 rounded ml-26 mt-5 mb-2">Add ToDo</button>
    
        </Form>
      </Formik>
    </div>
    </Fragment>
  )
}

export default ToDoForm
