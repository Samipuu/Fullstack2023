import { useState, useEffect } from 'react'
import connectorService from '../services/connector'
const api_key = import.meta.env.VITE_SOME_KEY

const Input = (props) => {
  return < input onChange={props.onChange} value={props.value} />
}

const Country = (country) => {
  const languages = Object.values(country.languages)
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    connectorService
      .location(country.capital[0])
      .then(response => {
        console.log(response)
        setWeather(response)
      })
  }, [])

  console.log(weather)
  if (weather == null) {
    return null
  }

  const icon = weather["weather"][0].icon
  return (
    <div>
      <h2>{country.name.common}</h2>
      Capital {country.capital}<br></br>
      Area {country.area}
      <h3>Languages</h3>
      {languages.map(part => <li>{part}</li>)} <br></br>
      <img src={country.flags.png}></img><br></br>
      <h3>Weather in {country.capital[0]}</h3>
      <p>Temperature {(weather["main"]["temp"] - 273.15).toFixed(2)} Celsius</p>
      <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`}></img>
      <p>Wind {weather["wind"]["speed"]} m/s</p>
    </div>
  )
}

const Button = (props) => {
  return <button onClick={props.onClick}>Show</button>
}

const Content = (props) => {


  const parts = props.countries

  if (parts.length > 10) {
    return (
      <div>Too many matches, specify more</div>)
  }
  if (parts.length == 1) {
    const country = parts[0]
    return Country(country)
  }
  const Part = (props) => {
    const part = props.part

    return (
      <li key={part.name.common}>
        {part.name.common} <Button onClick={(event) => { props.val(part.name.common) }} />
      </li>
    )
  }



  return (
    <div>
      {parts.map(part => <Part part={part} val={props.setVal} />)}
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchVal, setSearchVal] = useState('')
  const result = countries.filter(country => country.name.common.toLowerCase().includes(searchVal.toLowerCase()))


  useEffect(() => {
    connectorService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response)
      })
  }, [])
  console.log(result)



  return (
    <div>
      <h2>Countries</h2>
      <div>
        <h2>Search</h2>
        <div>
          Search: <Input onChange={(event) => setSearchVal(event.target.value)} value={searchVal} />
        </div>
        <Content countries={result} setVal={setSearchVal} />
      </div>
    </div>
  )
}



export default App