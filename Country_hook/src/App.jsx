import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  const [error, setError] = useState(null)
  
  console.log(name)

  useEffect(() => {

    if (name.length > 0){
    
    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
    .then(res => {
      setError(null)
      return setCountry(res)
    })
    .catch(err => {
      setCountry(null)
      return setError(err)
    })
    }

  }, [name])

  if (country){
   return country
  }

  else if (error){
    return error
  }
  }

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  else if (!country.data){
    return 'not found...'
  }

  else if (country.data){

  return (
    <div>
      <h3>{country.data.name.common} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div> 
      <img src={country.data.flag} height='100' alt={`flag of ${country.data.name.common}`}/>  
    </div>
  )
}
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App