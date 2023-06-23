
import UnauthRouter from './page/UnauthRouter';
import AuthRouter from './page/AuthRouter';
import { useState } from 'react';
import { useEffect } from 'react';
import './App.css';
import 'leaflet/dist/leaflet.css'
import { useNavigate } from "react-router-dom";
import { useAuth } from './context/authContext';
import jwtDecode from 'jwt-decode';
function App() {
  // const {user} = useAuth();

  const auth = useAuth();
  const navigate = useNavigate();
  const [tokenValid, setTokenValid] = useState(true);
  const [state, setState] = useState({})


  const isTokenValid = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      setState({ ...state, admins: decodedToken, loading: false });
      const currentTime = Date.now() / 1000;
      return decodedToken.exp > currentTime;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    if (auth.isAuthenticated) {
      const token = localStorage.getItem("token");

      if (!isTokenValid(token)) {
        alert("Your session has expired. Please log in again.");
        setTokenValid(false);
        auth.logout();
        navigate("/");
      }
    }
  }, [auth, navigate]);
 
  return (
    auth.isAuthenticated && tokenValid ? <AuthRouter /> : <UnauthRouter />)
 
}

export default App;