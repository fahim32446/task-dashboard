import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
    const [info, setInfo] = useState({ name: '', email: '', password: '' })

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(info);
    }

    return (

        <div style={{ marginTop: '10%' }} className='container w-50'>
            <form onSubmit={handleSubmit}>

                <h3 className='mb-3'>Register Your Account</h3>

                <div className="form-outline mb-2">
                    <input type="text" id="form2Example1" className="form-control" placeholder='Name' value={info.name} onChange={(e) => setInfo({ ...info, name: e.target.value })}  required />
                </div>

                <div className="form-outline mb-2">
                    <input type="email" id="form2Example1" className="form-control" placeholder='Email' value={info.email} onChange={(e) => setInfo({ ...info, email: e.target.value })}  required />
                </div>

                <div className="form-outline mb-2">
                    <input type="password" id="form2Example2" className="form-control" placeholder='Password' value={info.password} onChange={(e) => setInfo({ ...info, password: e.target.value })}  required />
                </div>

                <button type="submit" className="btn btn-primary btn-block mb-1">Login</button>

                <Link to='../login'>
                    <p className='d-flex justify-content-end'>Already have account? Login Here</p>
                </Link>
            </form>

        </div>
    )
}

export default Register