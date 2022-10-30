import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useFetch from "../hooks/useFetch";
import { URL } from '../const/Url';
import Spinner from '../components/Spinner';
import axios from 'axios';

const User = () => {
  const [err, setErr] = useState(null)
  const [admin, setAdmin] = useState(false);

  const { data, loading, error } = useFetch(`${URL}/users`);

  useEffect(() => {
    const {isAdmin} = JSON.parse(localStorage?.getItem('user'));
    setAdmin(isAdmin);
  }, []);

  console.log(admin);


  const handleClick = async (id) => {
    const { token } = JSON.parse(localStorage?.getItem('user'));
    try {
      await axios.delete(`${URL}/users/${id}`, {
        headers: { token }
      })
    } catch (err) {
      setErr(err.response.data)
    }
  }

  return (

    <div className='container'>
      
      {err ? <p>{err.message}</p> : ''}

      {loading ? <Spinner /> :

        <div>
          <Link to='../add-new-user'>
            <button className={ admin ? "btn btn-primary btn-sm mb-2" : `d-none`}>Add new user</button>
          </Link>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">User Name</th>
                <th scope="col">Email</th>
                <th scope="col">Action</th>
              </tr>
            </thead>


            <tbody>

              {data.map((item, index) => (

                <tr>
                  <th scope="row">{item._id}</th>
                  <td>{item.name}</td>
                  <td>{item.email}</td>

                  <td >

                    <div className='d-flex flex-column'>
                      {/* <div style={{ width: '20px' }}>
                        <button type="button" className="btn btn-success mb-2  btn-sm">Update</button>
                      </div> */}

                      <div style={{ width: '20px' }}>
                        <button onClick={() => handleClick(item._id)} type="button" className="btn btn-danger  btn-sm">Delete</button>
                      </div>

                    </div>


                  </td>
                </tr>
              ))}



            </tbody>
          </table>

        </div>

      }


    </div>
  )
}

export default User