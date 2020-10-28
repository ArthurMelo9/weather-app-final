import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Home(props) {

  const server = 'https://api.openweathermap.org/data/2.5/'
  const key = 'a6922589129783432b9e6268378c3da5'

  const dateBuild = (d) => {
    let date = String(new window.Date())
    date = date.slice(3, 15)
    return date
  }

  const [searchHistories, setSearchHistory] = useState([])
  const [location, setLocation] = useState('')
  const [weather, setWeather] = useState({})

  function addSearchToSearchHistory(location, result) {
    let singleSearchHistory = {
      term: location,
      result: result
    }

    // Make a copy of the search history in state and fill it 
    // with the previous 4 searches
    let tempSearchHistories = searchHistories

    // Add single search to the beginning of the list
    tempSearchHistories.unshift(singleSearchHistory)

    // Check if the list is more than 5 elements
    // If it is, remove the last element
    if (tempSearchHistories.length > 5) {
      tempSearchHistories = tempSearchHistories.slice(0, 5)
    }

    // update my search history list with this new array (5 most recent searches)
    setSearchHistory(tempSearchHistories)

    let userObject = props.userData
    userObject.history = tempSearchHistories
    props.updateUser(userObject)
  }

  const handleSearch = (e) => {
    e.preventDefault()

    let searchTerm = location

    fetch(`${server}weather?q=${location}&units=metric&APPID=${key}`)
      .then((res) => res.json())
      .then((result) => {
        setLocation('')
        setWeather(result)

        if (props.userData) {
          addSearchToSearchHistory(searchTerm, result)
        }
      })
  }

  useEffect(
    function () {
      let country = " Ireland"
      fetch(`${server}weather?q=${country}&units=metric&APPID=${key}`)
        .then((res) => res.json())
        .then((result) => {
          console.log(result)
          setLocation('')
          setWeather(result)
        })
    },
    []
  )

  useEffect(function () {
    if (props.userData) {
      setSearchHistory(props.userData.history)
    }
  }, [props.userData])

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 25) ? 'App warm' : 'app') : 'app'}>
      <main>
        <div className='top-container'>
          <div className='search-wrap'>
            <input
              type='text'
              placeholder='Search location...'
              className='searchbar'
              value={location}
              onChange={e => setLocation(e.target.value)}
            />
            <button className="button" type="submit"
              onClick={e => handleSearch(e)}>
              Search
          </button>
          </div>
        </div>
        <div className='bottom-container'>
          {weather.main ? (
            <div className="info-wrap">
              <div className="location-container">
                <div className="location">
                  <span>{weather.name}, {weather.sys.country} </span>
                </div>
                <div className="date"> {dateBuild(new Date())} </div>
              </div>
              <div className="weather-container">
                <div className="temperature">
                  <p> <br /> <span>{Math.round(weather.main.temp)} &deg;C</span> </p>
                </div>
                <div className="weather">
                  <p> <br /> <span>{weather.weather[0].main}</span> </p>
                </div>
              </div>
            </div>
          ) : (
              <div>
                {
                  props.userData ?
                    <p className='null-void'>
                      Hello {props.userData.name}, welcome to our weather app
              </p>
                    :
                    <p className='null-void'>
                      Hello, <Link to="/login">Log in</Link> to our weather app to see your search history
                      <br />
                      <br />
                      <hr />
                      <br />
                    </p>


                }

                <br />
                <p className='null-void'> Search a location to get weather details </p>
              </div>
            )}
        </div>
      </main>
    </div>
  );
}

export default Home
