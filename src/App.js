import React, { useState } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import Home from './components/home/Home'
import Signup from './components/signup/Signup'
import Login from './components/login/login'
import Profile from './components/auth/profile'

function App() {
  const [userData, setUserData] = useState(false)

  function updateLoggedInUserInfo (user) {
    setUserData(user)
  }

  return(
    <div className='app'>
      
      <Link to='/'> Home </Link>
      {
        userData ?
          <div>

            <Link to='/profile'> Profile </Link>
            <button onClick={e => updateLoggedInUserInfo(false)}>
              Logout
            </button>
          </div>
          :
          <div>
            <Link to='/login'> Login </Link>
            <Link to='/signup'> Sign Up </Link>
          </div>
      }

      <Switch>
        <Route exact path='/'>
          <Home userData={userData}
            updateUser={updateLoggedInUserInfo} />
        </Route>

        <Route exact path='/signup'>
          <Signup />
        </Route>

        <Route exact path='/login'>
          <Login userData={userData}
            updateUser={updateLoggedInUserInfo} />
        </Route>

        <Route exact path='/profile'>
          <Profile userData={userData} />
        </Route>
      </Switch>

    </div>
  )
}

export default App