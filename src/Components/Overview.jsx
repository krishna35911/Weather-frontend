import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './Navbar.css'
import GaugeChart from 'react-gauge-chart'
import { BarChart } from '@mui/x-charts'
import DonutChart from 'react-donut-chart'
import { useNavigate } from 'react-router-dom'

function Overview() {
 const[data,setdata]=useState([])
    const[cityname,setcityname]=useState({
        city:""
    })
    const[speed,setspeed]=useState(0)
    const[deg,setdeg]=useState(0)
    const[username,setusername]=useState("")
    const navigate=useNavigate()

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

      const currentDate = new Date();

      let currentHour = currentDate.getHours()%12;
      const currentMinute = currentDate.getMinutes();
      const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const currentDayIndex = currentDate.getDay();
      const currentDay = daysOfWeek[currentDayIndex];
      
      const amPM = currentHour >= 12 ? 'PM' : 'AM';
            
      const currentTimeString = `${currentDay} ${currentHour}:${currentMinute}: ${amPM}`;
      
      console.log(currentTimeString);

      const sun = data.sys?.sunrise;
      const sunrise = sun ? `Around ${new Date(sun * 1000).getHours() % 12} ${sun >= 12 ? 'PM' : 'AM'}` : '';
      console.log(sunrise);
      
      const set = data.sys?.sunset;
      const sunset = set ? `Around ${new Date(set * 1000).getHours() % 12} ${set >= 12 ? 'PM' : 'AM'}` : '';
      console.log(sunset);
      
      const lat=data.coord?.lat;
      console.log(lat);
      const lon=data.coord?.lon

    const logout=()=>
    {
        sessionStorage.removeItem("alreadyuser")
        sessionStorage.removeItem("token")
        navigate('/')
    }
      
 useEffect(()=>
  {
    if(data.wind)
    {
       setspeed(data.wind.speed)
       setdeg(data.wind.deg)
    }
  },[data])

  useEffect(()=>
  {
    if(sessionStorage.getItem("token"))
    {
        setusername(JSON.parse(sessionStorage.getItem("alreadyuser"))?.username)
    }
  },[])

  return (
    <div style={{overflowX:'hidden'}}>
      <nav className="navbar navbar-expand-lg  w-100 p-4">
        <div className="container-fluid">
          <a className="navbar-brand ms-2" href="/">
          <i class="fa-solid fa-cloud-moon fa-2x" style={{color: '#211C6A'}}></i>  </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <li className="nav-item ms-md-3 ms-lg-3 d-flex mt-3" style={{listStyle:'none'}}>
                <a className="nav-link active ms-2" aria-current="page">
                  <p>Dashboard</p>
                </a>
                <a className="nav-link active ms-5 me-4" href='/settings' aria-current="page">
                  <p>Settings</p>
                </a>
                
              </li>
            <form className="d-flex ms-md-5 ms-lg-5 me-md-3 me-lg-5 w-50">
              <input
                className="form-control me-2 flex-grow-1"
                type="search" value={cityname.city} onChange={(e) => setcityname({ city: e.target.value })}
                placeholder="Search by city"
                aria-label="Search" style={{color: '#211C6A'}}
              />
              <button className="btn btn-outline-secondary" type="button" onClick={(e)=>weatherdata(e)}>
                Search
              </button>
            </form>
            <li className="dropdown mt-2 ms-5" style={{listStyle:'none'}}>
            <p
              className="dropdown-toggle"
              type="button"
              id="aboutDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
            {username?`${username}`:'User'}
            </p>
            <ul className="dropdown-menu" aria-labelledby="aboutDropdown">
              <li>
              <button className="dropdown-item btn" onClick={logout}>
                Logout
              </button>
              </li>
            </ul>
          </li>
          </div>
        </div>
        </nav>
      <div className='row d-flex mt-4 ms-3'>
        <div className="col-md-8">
            <h5>Current Location : 
                <span className='fw-bold ms-3'>{data.name}</span>
            </h5>
            <div className='row mt-3'>
                <div className="col-md-8 rounded shadow d-flex flex-column p-5">
                    <div className='d-flex justify-content-between'>
                        <div>
                            <img src="https://cdn4.iconfinder.com/data/icons/the-weather-is-nice-today/64/weather_3-512.png" alt="" style={{width:'50px'}}/>
                            <h5 className='mt-3'>{(data.main && (data.main.temp - 273.15).toFixed(2))}°C</h5>
                        </div>
                        <div>
                        <h4 className='mt-2'>{data.weather && (data.weather[0].description)}</h4>
                        <p className='mt-4'>{currentTimeString}</p>
                        </div>
                    </div>
                    <div className='d-flex justify-content-center mt-3'>
                        <div className="col-md-4 p-3 text-center " style={{ backgroundColor: '#FFE4C9', borderRadius: '60px', width: '30%' }}>
                        <h6>Visibility</h6>
                        <h5>{data.visibility && (data.visibility / 1000).toFixed(2)}</h5>
                        </div>
                        <div className="col-md-4 p-3 ms-4 text-center" style={{ backgroundColor: '#BBE2EC', borderRadius: '60px', width: '30%' }}>
                        <h6>Pressure</h6>
                        <h5>{data.main && data.main.pressure}</h5>
                        </div>
                        <div className="col-md-4 p-3 ms-4 text-center" style={{ backgroundColor: '#CDFADB', borderRadius: '60px', width: '30%' }}>
                        <h6>Humidity</h6>
                        <h5>{data.main && data.main.humidity}</h5>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 rounded shadow p-4" style={{backgroundColor:'#BFCFE7'}}>
                <h5 className='text-center mt-3'>Wind Speed</h5>
                  <GaugeChart id="gauge-chart4" className='mt-5' 
                    nrOfLevels={13} 
                    arcPadding={0.1} 
                    cornerRadius={3} 
                    percent={speed/100} 
                    colors={['#424769']}
                    needleColor="#7077A1"
                    animateDuration={5000}
                    animDelay={500}
                    animate='true' 
                  />
                </div>
            </div>
        </div>
        <div className="col-md-4 d-flex flex-column">
        <div className='rounded shadow p-5 d-flex' style={{backgroundColor:'#EEEEEE'}}>
            <img src="https://cdn4.iconfinder.com/data/icons/the-weather-is-nice-today/64/weather_27-512.png" alt="" style={{width:'50px'}} />
            <h5 className='mt-3 ms-3'>Sunrise : {sunrise}</h5>
        </div>
        <div className='rounded shadow p-5 mt-5 d-flex' style={{backgroundColor:'#EEEEEE'}}>
            <img src="https://cdn4.iconfinder.com/data/icons/the-weather-is-nice-today/64/weather_26-512.png" alt="" style={{width:'50px'}}/>
            <h5 className='mt-3 ms-3'>Sunset : {sunset}</h5>
        </div>
        </div>
      </div>
      <div className='row d-flex'>
      <div className='col-md-6'>
          <BarChart
                colors={['#FFB996','#FF9BD2','#7FC7D9']}
                xAxis={[{ scaleType: 'band', data: ['Max temp', 'Feels Like', 'Min Temp'] }]}
                series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
                width={600}
                height={380}
            />
      </div>
      {/* <div className="col-md-2 d-flex flex-column mt-3">
        <div className='rounded shadow p-5'>
            Sunrise : {sunrise}
        </div>
        <div className='rounded shadow p-5 mt-4'>
            Sunset : {sunset}
        </div>
        </div> */}
      <div className='col-md-6 mt-4'>
      <DonutChart
                  data={[
                    {
                      label: 'Latitude',
                      value: lat,
                    },
                    {
                      label: 'Longitude',
                      value: lon,
                    },
                  ]}
                  colors={['#E6A4B4','#EBD9B4']}
                  height={330}
                  width={500}
                />
      </div>
      
      </div>
    </div>
  )
}

export default Overview
