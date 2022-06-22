import { useEffect, useState } from "react";

const useFetch = (url) =>{

    const [data, setData] = useState({})
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
            fetch(url)
            .then(res => {
                if(!res.ok){
                    throw Error('could not fetch data');
                }
                return res.json();
            })
            .then(resData => {
                setData(resData)
                setIsPending(false);
                setError(null);
            })
            .catch(err => {
                setIsPending(false);
                setError(err.message);
            })
    }, [url])

    return {data, isPending, setIsPending, error, setError}
}

export default useFetch;