import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Profile from './components/Profile'
import Header from './components/Header'
import Register from './components/Register'
import useToken from './components/useToken'
import './App.css'

function App() {
  const { token, removeToken, setToken } = useToken();
  return (
    <BrowserRouter>
      <div className="App">
        <Header/>
        <Routes>
          <Route exact path="/register" element={<Register />}/>
          {console.log(token)}
          {token =="" && token == undefined?  
            <Route exact path="/login" element={<Login setToken={setToken}/>}/>
            
          :(<>
            <Route exact path="/profile" element={<Profile token={token} setToken={setToken}/>}/>
            </>
          )}
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;