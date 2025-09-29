import {React,Fragment,useState} from 'react'
import {Form,Field,Formik} from "formik"
import {useNavigate} from 'react-router-dom'
import axios from "axios"
const BASE_URL=import.meta.env.VITE_API_URL
function SignupForm() {
    const[Error,setError]=useState("")
    const navigate=useNavigate()
    const initialValues={
        name:"",
        email:"",
        password:""
    }
    const formSubmitHandler=async(values,{resetForm})=>{
      try{
        const newUser=await axios.post(`${BASE_URL}/new-user`,values)
        console.log("new user created: ",newUser);
        console.log(newUser);
        if(newUser.data.message==="User already exists, please login"){
            alert(newUser.data.message)
            resetForm()
            return
        }
        resetForm()
        navigate("/login")
      }catch(err){
        const message=err.response?.data?.message||"Something Went Wrong"
        setError(message)
        alert(message)
      }
     
    }
  return (
     <Fragment>
          <h1 className="text-2xl max-w-sm mx-auto">SignUp</h1>
          <div className="max-w-3xl mx-auto mt-10 p-5 h-[100px] border rounded ">
          <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          onSubmit={formSubmitHandler}>
            <Form>
               <div className="flex mx-auto max-w-fit gap-3">
                <label htmlFor="name" className='font-bold'>Name:</label>
                <Field type="text" name="name" id="name" className="border" />

                <label htmlFor="email" className="font-bold">Email:</label> <br />
                <Field type="text" name="email" id="email" className="border"/>
                
                <label htmlFor="password" className="font-bold ml-3">Password:</label> <br />
                <Field type="password" name="password" id="password" className="border"/> <br />
                </div>
            
                <button type="submit" className="bg-blue-500 text-white p-1 rounded ml-26 mt-5 mb-2">Signup</button>
                <button type="button" className="bg-blue-500 text-white p-1 rounded ml-26 mt-5 mb-2" onClick={()=>navigate("/login")}>Login</button>
        
        
            </Form>
          </Formik>
        </div>
        </Fragment>
  )
}

export default SignupForm
