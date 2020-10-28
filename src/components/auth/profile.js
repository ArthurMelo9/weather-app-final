import React from 'react'
import { Link } from 'react-router-dom'
import SearchHistoryItem from './../search/SearchHistoryItem'

function Profile (props) {

  return (
    <div>
      {
        props.userData ?
          <div>
            <h1 className='null-void'>
              Hello {props.userData.name}, welcome to our weather app
            </h1>

            <div>
              <h1>Recent Searches</h1>
              {
                props.userData.history.map((searchHistory, index) =>
                  <SearchHistoryItem key={index}
                    term={searchHistory.term}
                    result={searchHistory.result} />
                )
              }
            </div>
          </div>
          :
          <h1 className='null-void'>
            You are not logged in. Kindly <Link to="/login">Log in</Link>
          </h1>
      }
    </div>
  )
}

export default Profile
