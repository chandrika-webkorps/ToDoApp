import {React,Fragment,useState} from 'react'
import {Form,Field,Formik} from "formik"
import {useNavigate} from 'react-router-dom'
import axios from "axios"
const BASE_URL="http://localhost:8080"
function LoginForm() {
  const[Error,setError]=useState("")
    const navigate=useNavigate()
    const initialValues={
        email:"",
        password:""
    }
    const formSubmitHandler=async(values,{resetForm})=>{
      try{
        const loggedInUser=await axios.post(`${BASE_URL}/login-user`,values)
        console.log("new user created: ",loggedInUser);
        console.log(values);
        navigate("/todo")
        resetForm()

      }catch(err){
        const message=err.response?.data?.message||"Something Went Wrong"
        console.log("Error creating a new user",err);
        setError(message)
        alert(message)
      }
     
    }
  return (
     <Fragment>
          <h1 className="text-2xl max-w-sm mx-auto">Login</h1>
          <div className="max-w-3xl mx-auto mt-10 p-5 h-[100px] border rounded ">
          <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          onSubmit={formSubmitHandler}>
            <Form>
               <div className="flex mx-auto max-w-lg gap-3">
                <label htmlFor="email" className="font-bold">Email:</label> <br />
                <Field type="text" name="email" id="email" className="border"/>
                
                <label htmlFor="password" className="font-bold ml-3">Password:</label> <br />
                <Field type="password" name="password" id="password" className="border"/> <br />
                </div>
            
                <button type="submit" className="bg-blue-500 text-white p-1 rounded ml-26 mt-5 mb-2">Login</button>
        
            </Form>
          </Formik>
        </div>
        </Fragment>
  )
}

export default LoginForm
