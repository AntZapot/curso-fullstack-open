import React, { useEffect, useState } from 'react'
import axios from 'axios';



const App = () => {

    const [newValue, setNewValue] = useState("");
    const [countries, setCountries] = useState([]);

    const handleInputChange = (e) => {
        setNewValue(e.target.value);
    }
    
    useEffect(() => {
        axios
            .get(`https://restcountries.com/v3.1/name/${newValue}`)
            .then(res => {
                setCountries(res.data);
            })
    }, [newValue]);
    
    return (
        <>
            <div>
                find countries <input value={newValue} onChange={handleInputChange}/>
            </div>
            <div>
                {
                countries.length > 10 && countries.length > 0
                    ? <p>Too many matches, specify another filter</p>   
                    : countries.map(
                        country => (
                            <Country setNewValue={setNewValue} key={country.name.common} country={country} length={countries.length}/>
                        ) 
                    )
                }
            </div>
        </>
    )
}

const Country = ({country, length, setNewValue}) => {
    return (
        <>
            {length === 1 
                ? 
                <div>
                    <h1>{country.name.common}</h1>
                    <p>Capital {country.capital[0]}</p>
                    <p>Population {country.population}</p>
                    <br />
                    <h2>Languages</h2>
                    <ul>
                    {Object.keys(country.languages).map(
                            language => (
                                <li key={language}>{country.languages[language]}</li>
                        )
                    )}
                    </ul>
                    <img alt="Country png" src={country.flags.png} />
                    <Weather capital={country.capital[0]}/>
                </div>
                : 
                <div>
                    <p>{country.name.common}</p>
                    <Button setNewValue={setNewValue} name={country.name.common}>Show:</Button>
                </div>
            }
            
        </>
    )  
}

const Weather = ({capital}) => {
    const api_key = process.env.REACT_APP_API_KEY;
    const [weatherInfo, setWeatherInfo] = useState([])

    useEffect(() => {
        axios
            .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
            .then(res => {
                setWeatherInfo(res.data);
            })
    }, [api_key, capital]);

    if(weatherInfo.length !== 0 ) {
        return (
            <>
                <p><b>Temperature:</b> {weatherInfo.current.temperature}</p>
                <img alt="Weather icon" src={weatherInfo.current.weather_icons[0]}/>
                <p><b>Wind:</b> {weatherInfo.current.wind_speed} mph direction: {weatherInfo.current.wind_dir}</p>
            </>
        )
    }
    return (
        <p>Loading...</p>
    )
}

const Button = ({setNewValue, name}) => (
        <button onClick={() => setNewValue(name)}>Show</button>
)


export default App
