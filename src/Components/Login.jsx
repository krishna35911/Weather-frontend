import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { adminloginapi, loginapi, registerapi } from '../backend services/apis';

function Login({register}) {
  const [userdata,setuserdata]=useState({
    username:"",
    useremail:"",
    userpassword:""
})
console.log(userdata);
const navi=useNavigate()

const handleregister=async(e)=>
{
    e.preventDefault()
    const{username,useremail,userpassword}=userdata

    if(!username || !useremail || !userpassword)
    {
        alert('Fill completely')
    }
    else
    {
        const result=await registerapi(userdata)

        if(result.status==200)
        {
            alert('succesfully registered')
            setuserdata({
                username:"",
                useremail:"",
                userpassword:""
            })
            navi('/')
        }
        else
        {
            alert(result.response.data)
        }
    }
}

const login=async(e)=>
{
    e.preventDefault()
    const {useremail,userpassword}=userdata
    if(!useremail || !userpassword)
    {
        alert('Fill completely')
    }
    else
    {    
        if(useremail === 'admin@gmail.com')
        {
            try {
                const admin=await adminloginapi({adminemail:'admin@gmail.com',adminpassword:'admin@123'})
                if(admin.status ===200)
                {

                    alert('admin logged in')
                    sessionStorage.setItem('adminuser',JSON.stringify(admin.data.adminuser))
                    sessionStorage.setItem('admintoken',admin.data.admintoken)
                    setuserdata({
                        useremail:"",
                        userpassword:""
                    })
                    setTimeout(()=>
                    {
                        navi('/welcome')
                    },1000)
                }
                else
                {
                    alert('invalid login')
                }

            } catch (error) {
                console.log(error);
            }
        }
        else{
            const res=await loginapi(userdata)
            console.log(res);

            if(res.status==200)
            {
                alert('login successful')
                sessionStorage.setItem('alreadyuser',JSON.stringify(res.data.alreadyuser))
                sessionStorage.setItem('token',res.data.token)

                setuserdata({
                    useremail:"",
                    userpassword:""
                })
                setTimeout(()=>
                {
                    navi('/overview')
                },1000)
            }
            else
            {
                alert(res.response.data)
            }
        }
       
    }
  }
    const registerform=register?true:false
 

  return (
    <div>
        <div className="row d-flex justify-content-center align-items-center mx-auto mt-5">
            
            <div className=" d-flex justify-content-center align-items-center flex-column  rounded shadow w-50 p-4">
                <h2 className='fw-bold' style={{fontSize:'40px',color:'#910A67',fontFamily:'monospace'}}> 
                {!registerform? 'Account Sign-in':'Create an account'}</h2>
                <form className='w-75'>
                    {registerform &&
                        <div className='mt-5'>
                            <input type="text" value={userdata.username} onChange={(e)=>setuserdata({...userdata,username:e.target.value})} className='form-control' placeholder='Username' /></div>
                    }
                    <div className='mt-5'>
                        <input type="text" className='form-control' value={userdata.useremail} onChange={(e)=>setuserdata({...userdata,useremail:e.target.value})} placeholder='Email address' />
                    </div>
                   <div className='mt-5'> 
                        <input type="password" value={userdata.userpassword} onChange={(e)=>setuserdata({...userdata,userpassword:e.target.value})} className='form-control' placeholder='Password' />
                    </div>
                    {registerform? <div className='mt-5 text-center'>
                        <button type='button' onClick={handleregister} className='btn btn-warning w-50'>
                        Sign Up</button></div>
                        :
                        <div className='mt-5 text-center'>
                        <button type='button' onClick={login} className='btn btn-warning w-50'>
                        Sign In</button></div>}
                        
                </form>
                {
                !registerform?
                <div className='mt-5'><p>New user? <a href="/register" style={{textDecoration:'none',color:'#D63484'}}>Sign Up</a></p></div>
                :
                <div className='mt-5'><p>Already a user? <a href="/" style={{textDecoration:'none',color:'#D63484'}}>Login</a></p></div>
                }
            </div>
        </div>
    </div>
  )
}

export default Login
