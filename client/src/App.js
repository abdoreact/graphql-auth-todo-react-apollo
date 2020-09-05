import React from 'react';
import './App.css';
import { useQuery } from '@apollo/client';
import Home from './components/Home';
import {isAuthQuery} from './queries'
function App({history:{push}}) {
  const {loading, data} = useQuery(isAuthQuery, {
    variables:{
      jwt:localStorage.getItem("jwt")
    }
  });
  if(loading) return "Loading...";
  setTimeout(() => {
    if(!data.isAuth) push('/register')
  }, 0)
  return <Home/>
}

export default App;
