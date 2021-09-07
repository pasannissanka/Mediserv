import { useState, useEffect } from "react";

export const useFetch = <T,>(url: string, options: RequestInit) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<T>();
  const [serverError, setServerError] = useState();

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
        const data: T = await response.json();

        setData(data);
        setIsLoading(false);
      } catch (error) {
        setServerError(error as any);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { isLoading, data, serverError };
};
