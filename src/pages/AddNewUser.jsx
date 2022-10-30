import React, { useState } from 'react'
import axios from 'axios';
import { URL } from '../const/Url'


const AddNewUser = () => {
  const [info, setInfo] = useState({ name: '', email: '', password: '', isEditor: 'false' })
  const [err, setErr] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { token } = JSON.parse(localStorage?.getItem('user'));

    try {
      await axios.post(`${URL}/auth/register`, info, {
        headers: { token }
      })
    } catch (error) {

      setErr(error.response.data)

    }
    console.log(info);
  }

  return (
    <div style={{ marginTop: '10%' }} className='container w-50'>
      <form onSubmit={handleSubmit}>

        <h3 className='mb-3'>Add new user</h3>

        <div className="form-outline mb-2">
          <input type="text" id="form2Example1" className="form-control" placeholder='Name' value={info.name} onChange={(e) => setInfo({ ...info, name: e.target.value })} required />
        </div>

        <div className="form-outline mb-2">
          <input type="email" id="form2Example1" className="form-control" placeholder='Email' value={info.email} onChange={(e) => setInfo({ ...info, email: e.target.value })} required />
        </div>

        <div className="form-outline mb-2">
          <input type="password" id="form2Example2" className="form-control" placeholder='Password' value={info.password} onChange={(e) => setInfo({ ...info, password: e.target.value })} required />
        </div>

        <select className="form-select form-select-sm" value={info.as} onChange={(e) => setInfo({ ...info, isEditor: e.target.value })}>
          <option value={'false'} selected>User</option>
          <option value={'true'}>Editor</option>


        </select>


        <button type="submit" className="btn btn-primary btn-block mb-1 mt-2">Sign Up</button>

      </form>

    </div>
  )
}

export default AddNewUser