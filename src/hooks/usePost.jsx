import { useEffect, useState } from "react";
import axios from "axios";

const usePost = (url, body) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    console.log(url, body);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         setLoading(true);
    //         try {
    //             const res = await axios.post(url);
    //             setData(res.data);
    //         } catch (err) {
    //             setError(err);
    //         }
    //         setLoading(false);
    //     };
    //     fetchData();
    // }, [url]);

    return { data, loading, error };
};

export default usePost;