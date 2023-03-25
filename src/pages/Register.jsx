import React from 'react'

function Register() {

  return (
    <>
      <div style={{textAlign: 'center'}}>
        <h2>Register</h2>
        <form>
          <div className='input-wrapper'>
            <input type="text" placeholder="Username"></input>
          </div>
          <div className='input-wrapper'>
            <input type="password" placeholder="Password"></input>
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </>
  )
}

export default Register