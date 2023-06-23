
import UnauthRouter from './page/UnauthRouter';
import AuthRouter from './page/AuthRouter';
// import { useState } from 'react';
// import { useEffect } from 'react';
import './App.css';
import { useAuth } from './context/authContext';

function App() {
  const {user} = useAuth();

  console.log(user);
 
  return (
    user ? <AuthRouter /> : <UnauthRouter />)
 
}

export default App;