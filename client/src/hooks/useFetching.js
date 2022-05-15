import {useState} from "react";

export const useFetching = (cb)=> {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetching = async (...args) => {
        try {
            setLoading(true)
            await cb(...args)
        } catch (e) {
            if (e.response.data.message) {
                setError(e.response.data.message)
            } else if (e.message) {
                setError(e.message)
            }
        } finally {
            setLoading(false)
        }
    }

    return [fetching, loading, error]
}