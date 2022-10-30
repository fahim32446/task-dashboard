import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { URL } from '../const/Url'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Login = () => {
  const [info, setInfo] = useState({ email: '', password: '' })
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const HandleSubmit = async (e) => {

    e.preventDefault()
    try {
      const {data} = await axios.post(`${URL}/auth/login`, info)

      localStorage.setItem('user', JSON.stringify(data));
      navigate('../user')
    
    } catch (error) {
      setError(error.response.data)
    }

  }

  return (
    <div style={{ marginTop: '10%' }} className='container w-50'>
      <form onSubmit={HandleSubmit}>

        <h3 className='mb-3'>Login Your Account</h3>
        <div className="form-outline mb-2">
          <input type="email" id="form2Example1" className="form-control" placeholder='Email' value={info.email} onChange={(e) => setInfo({ ...info, email: e.target.value })} required />
        </div>

        <div className="form-outline mb-2">
          <input type="password" id="form2Example2" className="form-control" placeholder='Password' value={info.password} onChange={(e) => setInfo({ ...info, password: e.target.value })} required />
        </div>

        <button type="submit" className="btn btn-primary btn-block mb-1">Login</button>
        {error ? <p>{error.message}</p> : ''}

      </form>

    </div>
  )
}

export default Login