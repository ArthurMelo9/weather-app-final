import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

function Login(props) {
  const history = useHistory()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleLogin(event,) {
    event.preventDefault()

    let data = {
      email,
      password
    }

    console.log("About to Login", data)

    // ...
    // Attempt login here probably via an API
    // ...
    const userData = {
      name: "Nana Kwame",
      location: "Accra",
      history: []
    }

    // After login, set the userData to the data of our new user
    props.updateUser(userData)

    history.push('/')
  }

  return (
    <div className="loginbox">
      <form>
        <div >
          <p>LOGIN</p>
          <br />
          <label>Email</label>
          <input type="email" id="email-box" value={email}
            onChange={e => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password}
            onChange={e => setPassword(e.target.value)} />
        </div>
        <div>
          <button type="submit"
            onClick={handleLogin}>
            Login
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login
