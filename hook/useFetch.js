import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../constants';

const useFetch = (method, endpoint, body) => {
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const options = {
        method: method,
        url: `${API_URL}/${endpoint}`,
        data: body,
    };

    const fetchData = async () => {
        setIsLoading(true);

        try {
            const response = await axios.request(options);

            setData(response.data);
            setIsLoading(false);
        } catch (error) {
            setError(error);
            alert('error happened');
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const refetch = () => {
        setIsLoading(true);
        fetchData();
    }

    return { data, isLoading, error, refetch };
}

export default useFetch; 