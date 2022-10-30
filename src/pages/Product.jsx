import React, { useState, useEffect } from 'react'
import Spinner from '../components/Spinner';
import useFetch from '../hooks/useFetch';
import { URL } from '../const/Url';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Product = () => {
  const navigate = useNavigate();

  const [err, setErr] = useState(null)

  const { data, loading, error } = useFetch(`${URL}/products`);


  const handleDelete = async (id) => {
    const { token } = JSON.parse(localStorage?.getItem('user'));
    try {
      await axios.delete(`${URL}/products/${id}`, {
        headers: { token }
      })
    } catch (err) {
      setErr(err.response.data)
    }
  }

  const handleUpdate = (id) => {
    console.log(id);
    navigate(`/update-product/${id}`);
  }

  return (
    <div className='container'>

      {err ? <p>{err.message}</p> : ''}

      {loading ? <Spinner /> :

        <div>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Image</th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Action</th>
              </tr>
            </thead>


            <tbody>
              {data.map((item, index) => (
                <tr>
                  <th scope="row">{item._id}</th>
                  <td>
                    <img style={{ width: "80px" }} src={item.image} />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td >

                    <div className='d-flex flex-column'>
                      <div style={{ width: '20px' }}>
                        <button type="button" onClick={() => handleUpdate(item._id)} className="btn btn-success mb-2  btn-sm">Update</button>
                      </div>

                      <div style={{ width: '20px' }}>
                        <button type="button" onClick={() => handleDelete(item._id)} className="btn btn-danger  btn-sm">Delete</button>
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

export default Product