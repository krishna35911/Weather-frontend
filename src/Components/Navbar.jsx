import axios from 'axios'
import React, { useState } from 'react'
import './Navbar.css'
import Overview from './Overview'
function Navbar() {

    const[data,setdata]=useState([])
    const[cityname,setcityname]=useState({
        city:""
    })
    const weatherdata = async (e) => {
        e.preventDefault()
        try {
          const result=await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityname.city}&appid=99debba57133a8f6d4e86bebf80f3fff`)
          setdata(result.data)
          }
         catch (error) {
          console.log(error);
        }
      }
  return (
    <div>
        
        <Overview items={data}/>
    </div>
  )
}

export default Navbar
