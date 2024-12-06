import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase/firebase"; 
import { onAuthStateChanged, signOut } from "firebase/auth";

const Auth = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const logout = async () => {
    setError(null);
    try {
      await signOut(auth);
      setUser(null);
    } catch (err) {
      console.error("Logout Error:", err.message);
      setError(err.message);
    }
  };

  return (
    <Auth.Provider value={{ user, logout, loading, error }}>
      {!loading ? children : <div>Loading...</div>}
    </Auth.Provider>
  );
};

export const useAuth = () => useContext(Auth);
