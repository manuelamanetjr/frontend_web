// src/context/UserContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../src/api"; // adjust the path if needed

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/profile", { withCredentials: true });
        setUserData(res.data);
      } catch (err) {
        console.error("Failed to fetch user data:", err.response?.data || err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ userData, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
