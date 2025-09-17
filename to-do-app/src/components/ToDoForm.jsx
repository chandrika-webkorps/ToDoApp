import {React,Fragment} from 'react'
import {Form,Field,Formik} from "formik"
function ToDoForm(props) {
    const initialValues={
        title:"",
        description:""
    }

    const formSubmitHandler=(values,{resetForm})=>{
        props.recieveTask(values)
        resetForm()
    }
  return (
    <Fragment>
      <h1 className="text-2xl max-w-sm mx-auto">My ToDos</h1>
      <div className="max-w-3xl mx-auto mt-10 p-5 h-[100px] border rounded ">
      <Formik
      initialValues={initialValues}
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
