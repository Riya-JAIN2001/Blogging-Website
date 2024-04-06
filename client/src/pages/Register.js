import React, { useState } from 'react'
import { Link , useNavigate} from 'react-router-dom';
import InputForm from '../components/InputForm';
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import { useDispatch,useSelector } from 'react-redux';
import axios from "axios";
import Snipper from '../components/Snipper';
import {toast} from "react-toastify";


const Register = () => {
  const [name,setName]=useState("");
  const [lastName,setLastname]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [location,setLocation]=useState("");
  const {loading} =useSelector(state => state.alerts)
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const handleSubmit=async (e)=>{
    e.preventDefault();
    try {
      if(!name || !lastName ||!email ||!password){
        return alert("please provide all the fields.")
      }
      dispatch(showLoading());
      const {data}=await axios.post("http://localhost:8080/api/v1/auth/register",{name,lastName,email,password,location});
      console.log({name,lastName,email,password,location})
      dispatch(hideLoading())
      if(data.success){
        toast.success("Register Successfully");
        navigate('/Dashboard');
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Invalid form detail")
      console.log(error)
      
    }
  }

  return (
    <>
    {
      loading? (<Snipper/>):(<div className='form-container'>
      
      <form className='card p-2' onSubmit={handleSubmit}>
      <img src="/assets/images/job-search.png" alt="logo" width="450px" height="200px" className='mb-5'/>  
  
  <InputForm htmlFor="name" labelText={"Name"} type={"text"} name="name" value={name} handelChange={(e)=>{setName(e.target.value)}} />
  
  <InputForm htmlFor="lastName" labelText={"LastName"} type={"text"} name="lastName" value={lastName} handelChange={(e)=>{setLastname(e.target.value)}} />
  
  <InputForm htmlFor="email" labelText={"Email"} type={"email"} name="email" value={email} handelChange={(e)=>{setEmail(e.target.value)}} />
  
  <InputForm htmlFor="password" labelText={"Password"} type={"password"} name="password" value={password} handelChange={(e)=>{setPassword(e.target.value)}} />
  
  <InputForm htmlFor="location" labelText={"Location"} type={"text"} name="location" value={location} handelChange={(e)=>{setLocation(e.target.value)}} />
  <div className="d-flex justify-content-between"> 
  <p>Already Register <Link to="/Login">Login</Link></p>
  <button type="submit" className="btn btn-primary">Submit</button>

  </div>
  
</form>

</div>)
    }
    
</>
    
  )
}

export default Register;