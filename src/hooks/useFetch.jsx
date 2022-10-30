import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const { token } = JSON.parse(localStorage?.getItem('user'));

        const auth = {
            headers: { token }
        }

        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await axios.get(url, auth);
                setData(res.data);
            } catch (err) {
                setError(err);
            }
            setLoading(false);
        };
        fetchData();
    }, [url]);

    return { data, loading, error };
};

export default useFetch;