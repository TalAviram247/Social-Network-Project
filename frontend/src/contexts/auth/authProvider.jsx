import React, { useState } from "react";
import { fetcher } from "../../helpers/fetcher";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthContext = React.createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const signIn = async (data) => {
    const user = await fetcher("/users/login", "POST", data);
    console.log("user", user);
    if (user.username) {
      localStorage.setItem("jwt", user.jwt);
      setUser(user);
      return user.username;
    } else {
      throw new Error(user.message);
    }
  };

  const refreshUser = (userData) => {
    setUser(userData);
  };

  const signOut = async () => {
    await fetcher("/users/logout");
    localStorage.removeItem("jwt");
    setUser(null);
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const enforceLogin = () => {
    if (!user) {
      navigate("/login");
    }
  };

  const enforceAdmin = () => {
    if (!user || user.type !== "admin") {
      navigate("/login");
    }
  };

  const value = {
    user,
    refreshUser,
    signIn,
    signOut,
    setUser,
    enforceLogin,
    enforceAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
