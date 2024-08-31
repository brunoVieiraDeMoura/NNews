// hooks/useFetch.js
import { useState, useEffect } from "react";

const useFetchIn = (url, method = "GET", body = null, authreq = false) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);
  const API_URL = "http://localhost:3000/api/auth";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = authreq ? localStorage.getItem("token") : null;
        const headers = {
          "Content-Type": "application/json",
          ...(authreq && token ? { Authorization: `Bearer ${token}` } : {}),
        };

        const options = {
          method,
          headers,
          body: body ? JSON.stringify(body) : null,
        };

        const response = await fetch(API_URL + url, options);
        setStatus(response.status);

        if (!response.ok) {
          const errorDetails = await response.json();
          throw new Error(
            errorDetails.message ||
              `Error ${response.status}: ${response.statusText}`,
          );
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        const errorMessage = err.message.includes(
          "A conexão coma a internet falou.",
        )
          ? `Server Error: ${err.message}`
          : `Fetch Error: ${err.message}`;
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, method, body, authreq]);

  return { data, loading, error, status };
};

export default useFetchIn;
