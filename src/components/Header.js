import React from 'react'
import {Link} from 'react-router-dom'

function Header() {
  return (
    <>
        <div className='header-wrapper'>
            <Link className='link left' to="/">Homepage</Link>
            <div className='right'>
                <Link className='link' to="/register">Register</Link>
                <Link className='link' to="/login">Login</Link>
                <Link className='link' to='/logout'>Logout</Link>
            </div>
        </div>
    </>
  )
}
export default Header