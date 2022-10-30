import React, { useState, useEffect } from 'react'
import axios from "axios";
import { URL } from '../const/Url';
import Spinner from '../components/Spinner';
import { useParams, useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

const AddProduct = () => {

    const [product, setProduct] = useState({ name: '', description: '', price: '', image: '' })
    const [file, setFile] = useState('');
    const { id } = useParams();
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    // const { data, loading, error } = useFetch(`${URL}/products/${id}`);

    // setFile(data)

    useEffect(() => {

        const getItem = async () => {
            try {
                const { data } = await axios.get(`${URL}/products/${id}`)
                setProduct(data)
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        }
        getItem();

    }, []);






    const handleSubmit = async (e) => {

        e.preventDefault();
        const { token } = JSON.parse(localStorage?.getItem('user'));

        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "upload");
        try {
            const uploadRes = await axios.post(
                "https://api.cloudinary.com/v1_1/dzjobnqsf/image/upload", data, {
                withCredentials: false,
                onUploadProgress: ProgressEvent => {
                    console.log(ProgressEvent.loaded / ProgressEvent.total * 100);
                }
            });

            const { url } = uploadRes.data;
            const newProduct = {
                ...product, image: url
            };


            if (id) {
                await axios.put(`${URL}/products/${id}`, newProduct, {
                    headers: { token }
                })
            } else {
                await axios.post(`${URL}/products`, newProduct, {
                    headers: { token }
                })
            }

            navigate('../products')

        } catch (err) {
            console.log(err);
        }


    }

    return (
        <div className='container w-75'>

            {loading ? <Spinner /> :
                <form onSubmit={handleSubmit}>
                    <h4 className='mb-3'>Add Product</h4>
                    <div className="mb-3">
                        <input type="text" value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} className="form-control" placeholder='Product Name' />
                    </div>

                    <div className="mb-3">
                        <textarea className="form-control" value={product.description} onChange={(e) => setProduct({ ...product, description: e.target.value })} placeholder="Product Description" style={{ height: 100 }} defaultValue={""} />
                    </div>

                    <div className="mb-3">
                        <input type="text" value={product.price} onChange={(e) => setProduct({ ...product, price: e.target.value })} className="form-control" placeholder='Product Price' />                </div>

                    <div className="mb-3">
                        <input className="form-control" onChange={(e) => setFile(e.target.files[0])} type="file" id="formFile" />
                    </div>


                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            }


        </div>
    )
}

export default AddProduct