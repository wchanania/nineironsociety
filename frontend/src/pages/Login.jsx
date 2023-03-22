import React from 'react'

function Login() {
  return (
    <>
      <div style={{textAlign: 'center'}}>
        <h2>Login</h2>
        <form>
          <div className='input-wrapper'>
            <input type="text" placeholder="Username"></input>
          </div>
          <div className='input-wrapper'>
            <input type="password" placeholder="Password"></input>
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  )
}

export default Login