import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";

const AuthContext = React.createContext();

function AuthProvider(props) {
    const [state, setState] = useState({
        loading: true,
        error: null,
        user: null,
      });
    const navigate = useNavigate();

const [user,setUser] = useState(localStorage.getItem("token"))

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  

  const login = async (data) => {
    try {
      const result = await axios.post("http://localhost:9875/login", data);
      const token = result.data.token;
      setUser(Boolean(token));
      localStorage.setItem("token", token);
      navigate("/map");
    } catch (error) {
     alert(" Username or Password Incorrect");
      return Promise.reject(error);
    }
  };

  const isAuthenticated = Boolean(localStorage.getItem("token"));
  if (isAuthenticated && !state.user) {
    const token = localStorage.getItem("token");
    const userDataFromToken = jwtDecode(token);
    setState({ ...state, user: userDataFromToken, loading: false });
  }

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        user,
        isAuthenticated
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
