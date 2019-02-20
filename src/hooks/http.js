import { useState, useEffect } from 'react';

export const useHttp = (url, deps) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        console.log(`Send http request to url: ${url}`);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch.');
        }
        const fetchedData = await response.json();
        setData(fetchedData);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    })();
  }, deps);

  return [isLoading, data];
};
