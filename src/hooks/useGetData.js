import { useState, useEffect } from 'react';

const useGetData = (url) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function getData(url) {
    setLoading(true);
    fetch(url)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        setData(data);
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
        console.log(err);
      });
  }

  useEffect(() => {
    getData(url);
  }, [url])

  return {
    data,
    loading,
    error,
    getData: () => getData(url),
  }
}

export default useGetData;
