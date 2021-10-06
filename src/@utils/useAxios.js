import { useState, useEffect } from "react";
import axios from "axios";

/**
 * A custom hook built on top of Axios. It provides frequently used functionality like a loading state, an error state, and request cancellation.
 * @param 	{String} url	URL of the API resource.
 * @param 	{Object} cfg	Config for Axios call (same as in vanilla Axios).
 * @param 	{Array}	 deps	A dependency array (same as in the useEffect hook).
 * @returns {Object} 		{ data, loading, error }.
 * @author Adil Naqvi <adil.naqvi@pligence.com>
 */
function useAxios(url, cfg, deps) {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true);

        const source = axios.CancelToken.source();
        const cancelToken = source.token;

        axios(url, { cancelToken, ...cfg })
            .then(res => {
                if (res.data.error) {
                    setError(true);
                    setData({});
                    setLoading(true);
                    throw new Error("Error fetching data from backend");
                } else {
                    setData(res.data);
                    setLoading(false);
                    setError(false);
                }
            })
            .catch(err => {
                if (axios.isCancel(err)) {
                    setLoading(true);
                    setData({});
                    setError(false);
                } else {
                    setError(true);
                    setData({});
                    setLoading(true);
                }
            });

        return () => {
            // Cancel current request if the component umnounts or if a new request is made while the current on is pending
            if (source) {
                source.cancel();
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);

    return { data, loading, error };
}

export default useAxios;
