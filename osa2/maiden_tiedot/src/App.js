import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CountryDetails = ({country}) => {
  const langs = () => country.languages.map(l => <li key={l.name}>{l.name}</li>)
  return (
    <div>
      <h1>{country.name}</h1>
      <p>
        capital {country.capital}<br/>
        population {country.population}
      </p>
      <h2>languages</h2>
      <ul>
        {langs()}
      </ul>
      <img src={country.flag} width="100" alt=""></img>
    </div>
  )
}

const Countries = ({matches, goToCountry}) => {
  if (matches.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }
  if (matches.length > 1) {
    return <CountryList countries={matches} goToCountry={goToCountry} />
  }
  if (matches.length === 1) {
    return <CountryDetails country={matches[0]} />
  }
  return <div>'No match'</div>
}

const CountryList = ({countries, goToCountry}) => {
  const rows = countries.map(c =>
    <div key={c.name}>{c.name}<button onClick={() => goToCountry(c.name)}>show</button></div>
  )
  return (
    <div>{rows}</div>
  )
}

const App = () => {
  const [ filter, setFilter ] = useState('')
  const [ countries, setCountries ] = useState([])

  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }
  useEffect(hook, [])

  const onFilterChange = event => {
    setFilter(event.target.value)
  }

  const goToCountry = countryName => {
    setFilter(countryName)
  }

  const matches = countries.filter(c =>
    c.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <div>
        find countries <input value={filter} onChange={onFilterChange}/>
      </div>
      <div>
        <Countries matches={matches} goToCountry={goToCountry}/>
      </div>
    </div>
  )
}

export default App;
