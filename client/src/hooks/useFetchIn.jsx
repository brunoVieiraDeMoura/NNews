// hooks/useFetchIn.js
import { useState } from "react";

const API_URL = "http://localhost:3000/api/auth";

const useFetchIn = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);

  const fetchData = async (
    url,
    method = "GET",
    body = null,
    authreq = false,
  ) => {
    setLoading(true);
    setError(null);
    setStatus(null);

    try {
      const token = authreq ? localStorage.getItem("token") : null;
      const headers = {
        "Content-Type": "application/json",
        ...(authreq && token ? { Authorization: `Bearer ${token}` } : {}),
      };

      const response = await fetch(API_URL + url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : null,
      });

      setStatus(response.status);

      let result;
      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        result = await response.json(); // Analisar como JSON
      } else {
        result = await response.text(); // Analisar como texto
      }

      if (!response.ok) {
        throw new Error(result.msg || result || "Algo deu errado.");
      }

      setData(result);
    } catch (err) {
      setError(err.message);
      console.error("Erro ao fazer fetch:", err.message, err);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, status, fetchData };
};

export default useFetchIn;
