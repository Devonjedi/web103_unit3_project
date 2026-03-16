import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import LocationsAPI from '../services/LocationsAPI'
import '../css/Locations.css'

const Locations = () => {
    const [locations, setLocations] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        (async () => {
            try {
                const data = await LocationsAPI.getAllLocations()
                setLocations(data)
            } catch (error) {
                console.error('Failed to load locations:', error)
            }
        })()
    }, [])

    return (
        <div className='locations-page'>
            <div className='locations-intro'>
                <h2>Explore Twin Cities Coffee</h2>
                <p>Select a coffee shop to view upcoming and past events</p>
            </div>

            <div className='locations-grid'>
                {locations.map(location => (
                    <div
                        key={location.id}
                        className='location-card'
                        style={{ backgroundImage: `url(${location.image})` }}
                        onClick={() => navigate(`/location/${location.id}`)}
                    >
                        <div className='location-card-overlay'>
                            <h3>{location.name}</h3>
                            <p>{location.city}, {location.state}</p>
                            <button>View Events</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Locations
