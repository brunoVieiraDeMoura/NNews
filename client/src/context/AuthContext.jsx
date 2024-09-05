// context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem("token", token);
    setLoading(false);
    navigate("/dashboard");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  const updateUser = (updatedUser) => {
    setUser((prevUser) => ({ ...prevUser, ...updatedUser }));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetch("http://localhost:3000/api/auth/validate-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.valid) {
            setUser(data.user);
          } else {
            logout();
          }
        })
        .catch(() => {
          logout();
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
