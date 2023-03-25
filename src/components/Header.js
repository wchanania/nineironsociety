import React from 'react'
import axios from "axios"
import {Link} from 'react-router-dom'

function Header(props) {
  function logMeOut() {
    axios({
      method: "POST",
      url:"/logout",
    })
    .then((response) => {
       props.token()
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })}
  return (
    <>
        <div className='header-wrapper'>
            <Link className='link left' to="/">Homepage</Link>
            <div className='right'>
                <Link className='link' to="/register">Register</Link>
                <Link className='link' to="/login">Login</Link>
            </div>
        </div>
    </>
  )
}

export default Header