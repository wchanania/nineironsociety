import React, { useEffect, useState } from 'react';
import axios from 'axios'
import {useNavigate,BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Profile from './components/Profile'
import Header from './components/Header'
import Register from './components/Register'
import useToken from './components/useToken'
import './App.css'
import Logout from './components/Logout';

function App() {
  const { token, removeToken, setToken } = useToken();
  return (
    <BrowserRouter>
      <div className="App">
        <Header/>
        <Routes>
          <Route exact path="/register" element={<Register />}/>
          <Route exact path="/login" element={<Login setToken={setToken}/>}/>
          {/* {!token == undefined || !token == ''(*/}<> 
            <Route exact path="/profile" element={<Profile token={token} setToken={setToken}/>}/>
            <Route exact path="/logout" element={<Logout token={token} removeToken={removeToken}/>}/>
            </>
          {/* )} */}
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;