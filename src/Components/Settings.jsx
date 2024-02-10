import React, { useEffect, useState } from 'react'

function Settings() {
  const [userprofile, setUserprofile] = useState({
    username: '',
    useremail: '',
    userpassword: ''
    });

  useEffect(() => {
    const users = JSON.parse(sessionStorage.getItem('alreadyuser'));
    setUserprofile({
      ...userprofile,
      username: users.username,
      useremail: users.useremail,
      userpassword: users.userpassword
    });

  },[]);
  return (
    <div className="container mt-4 mb-5">
      <a href='/overview' className='btn btn-success'>Back to home</a>
    <div className="row d-flex justify-content-center align-items-center ">
      <h2 className="text-center fw-bold fs-3">Update details</h2>
      <form className="d-flex flex-column mx-auto w-50 text-center shadow rounded p-3 mt-4">
       
        <div className="mb-3 mt-4">
          <input
            type="text"
            placeholder=""
            className="form-control"
            value={userprofile.username}/>
        </div>
        <div className="mb-3">
          <input
            type="email"
            placeholder=""
            className="form-control"
            value={userprofile.useremail}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            placeholder=""
            className='form-control'
            value={userprofile.userpassword} 
          />
        </div>
        <div className="mb-3 d-flex mx-auto mt-4">

            <button type="button" className="btn btn-warning">
              Edit details
            </button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default Settings
