import { useEffect, useState } from 'react';
import Country from '../country/country';
import './countries.css';

const Countries = () => {
    const [countries, setCountries] = useState([])
    const [visitedCountries, setVisitedCountries] = useState([])
    const [visitedFlags, setVisitedFlags] = useState([])

    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all')
            .then(res => res.json())
        .then(data => setCountries(data))
    }, [])

    const handleVisitedCountry = country => {
        console.log('Add this to your list')
        const newVisitedCountry = [...visitedCountries, country]
        setVisitedCountries(newVisitedCountry)
    }

    const handleVisitedFlags = flag => {
        const newVisitedFlags = [...visitedFlags, flag]
        setVisitedFlags(newVisitedFlags)
    }

    return (
        <div>
            <h3>Countries: {countries.length}</h3>
            {/* visited countries */}
            <div>
                <h5>Visited Countries: {visitedCountries.length} </h5>
                <ul>
                    {
                        visitedCountries.map(country => <li key={country.cca3}>{country.name.common}</li>)
                    }
                </ul>
            </div>
            <div className='flag-container'>
                {
                    visitedFlags.map((flag, idx) => <img key={idx} src= {flag} ></img>)
                }
            </div>
            {/* display countries */}
            <div className='country-container'>

            {
                countries.map(country =>
                    
                    <Country
                        key={country.cca3}
                        handleVisitedCountry={handleVisitedCountry}
                        handleVisitedFlags = {handleVisitedFlags}
                        country={country}></Country>)
            }
            </div>
        </div>
    );
};

export default Countries;