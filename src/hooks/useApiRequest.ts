import axios from "axios";
import {useEffect, useState} from "react";
import toast from 'react-hot-toast';
import { navigate } from 'wouter/use-browser-location';

interface UseApiRequestParams {
  url: string;
  method: string;
  reqBody?: Record<string, any>;
}

export const useApiRequest = ({url, method, reqBody={}}: UseApiRequestParams) => {
    const [data, setData] = useState(null);
    const [dataLoading, setDataLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const requestHeaders = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };

    useEffect(() => {
        (async () => {
            setDataLoading(true)

            console.log('url', url)
            console.log('reqBody', reqBody)
            console.log('requestHeaders', requestHeaders)

            try {
                if(method.toUpperCase() === "GET") {
                    const response = await axios.get(url, {headers: requestHeaders})
                    console.log('resp', response.data)
                    setData(response.data)

                } else if(method.toUpperCase() === "POST") {


                    const response = await axios.post(url, reqBody, {headers: requestHeaders})
                    console.log('resp', response.data)
                    setData(response.data)

                } else if(method.toUpperCase() === "PUT") {
                    const response = await axios.put(url, reqBody, {headers: requestHeaders})
                    console.log('resp', response.data)
                    setData(response.data)
                } else if(method.toUpperCase() === "DELETE") {
                    const response = await axios.delete(url, {headers: requestHeaders})
                    console.log('resp', response.data)
                    setData(response.data)
                }

            } catch (error) {
                console.log(error)
                toast.error("Failed to fetch data")
                navigate('/login')
                setError(error instanceof Error ? error : new Error(String(error)));
            } finally {
                setDataLoading(false)
            }


        })()

    }, [url]);

    return {data, dataLoading, error}
}



