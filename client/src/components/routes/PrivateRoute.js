import React,{ useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import {showLoading,hideLoading} from "../../redux/features/alertSlice"
import axios from 'axios'
import {setUser} from '../../redux/features/auth/authSlice'
const PrivateRoute =  ({children}) => {
    const {user}=useSelector((state)=>state.auth);

const dispatch =useDispatch();
const getUser =async ()=>{
    try {
        dispatch(showLoading());
        const {data}=await axios.post('http://localhost:8080/api/v1/user/get-user',{token:localStorage.getItem('token')},{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        })
        dispatch(hideLoading())
        if(data.success){
       dispatch(setUser(data.data))
        }
        else{
            localStorage.clear();
            <Navigate to="/Login"/>
        }

    }
    catch(error){
        localStorage.clear();
        dispatch(hideLoading());
        console.log(error)
    }
}
useEffect(()=>{
    if(!user){
        getUser()
    }
})

if(localStorage.getItem("token")){
    return children;
} 
else{
    return <Navigate to="/Login"/>
}
}

export default PrivateRoute