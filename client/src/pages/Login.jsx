import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import InputForm from '../components/InputForm';
import { useDispatch,useSelector } from 'react-redux';
import axios from "axios";
import Snipper from '../components/Snipper'
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import {toast} from "react-toastify";

const Login = () => {
  
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const navigate =useNavigate();
  const dispatch=useDispatch();

  const {loading}=useSelector(state=>state.alerts);
  
  const handleSubmit=async (e)=>{
    e.preventDefault();
    try {
      dispatch(showLoading());
      const {data}=await axios.post("http://localhost:8080/api/v1/auth/login",{email,password});
      if (data.success){
        dispatch(hideLoading());
        
        localStorage.setItem('token',data.token);
        toast.success("Login Successfully");
        navigate('/Dashboard');

      }
      
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      toast.error("invalid");
      
    }
  }

  return (
    <>
       { loading ?( <Snipper/>):(<div className='form-container'>
      
      <form className='card p-2' onSubmit={handleSubmit}>
      <img src="/assets/images/job-search.png" alt="logo" width="450px" height="200px" className='mb-5'/>  
  
  
  <InputForm htmlFor="email" labelText={"Email"} type={"email"} name="email" value={email} handelChange={(e)=>{setEmail(e.target.value)}} />
  
  <InputForm htmlFor="password" labelText={"Password"} type={"password"} name="password" value={password} handelChange={(e)=>{setPassword(e.target.value)}} />
  
  <div className="d-flex justify-content-between"> 
  <p>user not yet <Link to="/Register">Register</Link></p>
  <button type="submit" className="btn btn-primary">Submit</button>

  </div>
  
</form>

</div>

    
)}
       
    </>
  )
}

export default Login