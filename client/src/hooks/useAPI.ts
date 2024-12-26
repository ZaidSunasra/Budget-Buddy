import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export const getData = ({ url }: { url: string }) => {

    const [apiData, setApiData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [serverError, setServerError] = useState<any>(null);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(url, {
                withCredentials: true,
            });
            setApiData(response.data);
        } catch (error: any) {
            setServerError(error);
        } finally {
            setIsLoading(false);
        }
    }, [url])
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { apiData, isLoading, serverError, refetch: fetchData};

}

export const postData = () => {

    const [apiData, setApiData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [serverError, setServerError] = useState<any>(null);

    const fetchData = async ({ url, payload, method }: { url: string, payload: any, method: 'POST' | 'PUT' | 'DELETE' | 'PATCH' }) => {
        const config = {
            method,
            url,
            data: payload,
            withCredentials: true
        }
        setIsLoading(true);
        setServerError(null);
        setApiData(null);
        try {
            const response = await axios(config);
            setApiData(response.data);
        } catch (error: any) {
            if (error.response && error.response.data) {
                setServerError(error.response.data);
            } else {
                setServerError({ msg: "Something went wrong. Please try again." });
            }
        } finally {
            setIsLoading(false);
        }
    }
    return { fetchData, apiData, serverError, isLoading };
    
}