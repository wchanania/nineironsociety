// import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import axios from 'axios'

import Header from './components/Header';
import Home from './pages/Home';
import Register from './pages/Register'
import Login from './pages/Login';
import Me from './pages/Me';




function App() {

   // new line start
  const [getMessage, setProfileData] = useState(null)

  function getData() {
    axios({
      method: "GET",
      url:"/profile",
    })
    .then((response) => {
      const res =response.data
      setProfileData(({
        profile_name: res.name,
        about_me: res.about}))
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })}
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/me" element={<Me />}/>
        </Routes>
      </Router>
      </>
  );
}

export default App;