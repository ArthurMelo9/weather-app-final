import React from 'react'


function SearchHistoryItem(props) {

  const dateBuild = (d) => {
    let date = String(new window.Date())
    date = date.slice(3, 15)
    return date
  }

  return (
    <div>
      <p>
        Search Term: {props.term}
      </p>

      <div className="info-wrap">
        <div className="location-container">
          <div className="location">
            <span>{props.result.name}, {props.result.sys.country} </span>
          </div>
          <div className="date"> {dateBuild(new Date())} </div>
        </div>
        <div className="weather-container">
          <div className="temperature">
            <p>  <br /> <span>{Math.round(props.result.main.temp)} &deg;C</span> </p>
          </div>
          <div className="weather">
            <p>  <br /> <span>{props.result.weather[0].main}</span> </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchHistoryItem
