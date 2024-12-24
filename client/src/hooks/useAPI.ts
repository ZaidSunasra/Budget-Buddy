import axios from "axios";
import { useEffect, useState } from "react"

export const getData = ({ url }: { url: string }) => {

    const [apiData, setApiData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [serverError, setServerError] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(url,{
                    withCredentials: true,
                });
                setApiData(response.data);
            } catch (error: any) {
                setServerError(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, [url]);

    return { apiData, isLoading, serverError };

}

export const postData = () => {

    const [apiData, setApiData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [serverError, setServerError] = useState<any>(null);

    const fetchData = async ({ url, payload }: { url: string, payload: any }) => {
        setIsLoading(true);
        setServerError(null);
        setApiData(null);
        try {
            const response = await axios.post(url, payload, {
                withCredentials: true,
            });
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