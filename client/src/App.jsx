
import UnauthRouter from './page/UnauthRouter';
// import AuthRouter from './page/AuthRouter';
// import { useState } from 'react';
// import { useEffect } from 'react';
import './App.css';

function App() {
  // const [tokenValid, setTokenValid] = useState(false);
  // const isAuthenticated = Boolean(localStorage.getItem("token"));

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     const token = localStorage.getItem("token");
  //     if (token) {
  //     setTokenValid(true);
  //     }
  //   }
  // }, [tokenValid]);

  return 
  isAuthenticated ? <AuthRouter /> : <UnauthRouter />
 
}

export default App;