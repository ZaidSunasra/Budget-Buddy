import { useEffect, useState } from 'react';
import { baseURL } from '@/types';
import axios from 'axios';

export const useDebounce = (value: string) => {
  const [debouncedValue, setDebouncedValue] = useState<string>(value);
  const [query, setQuery] = useState<any>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, 500);
    return () => clearTimeout(timer);
  }, [value]);

  useEffect(() => {
    const fetchQuery = async () => {
      if (debouncedValue.trim() === '') {
        setQuery(null);
        return;
      }
      try {
        const response = await axios.get(
          `${baseURL}/expense/search?value=${debouncedValue}`,
          {
            withCredentials: true,
          },
        );
        setQuery(response.data);
      } catch (error) {
        console.error('Error fetching search results:', error);
        setQuery(null);
      }
    };
    fetchQuery();
  }, [debouncedValue]);

  return query;
};
