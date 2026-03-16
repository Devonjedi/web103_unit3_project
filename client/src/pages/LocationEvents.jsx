import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Event from '../components/Event'
import LocationsAPI from '../services/LocationsAPI'
import EventsAPI from '../services/EventsAPI'
import '../css/LocationEvents.css'

const LocationEvents = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [location, setLocation] = useState(null)
    const [events, setEvents] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const [locationData, eventsData] = await Promise.all([
                    LocationsAPI.getLocationById(id),
                    EventsAPI.getEventsByLocation(id)
                ])
                setLocation(locationData)
                setEvents(eventsData)
            } catch (error) {
                console.error('Failed to load data:', error)
            }
        })()
    }, [id])

    if (!location) return <div className='loading'>Loading...</div>

    return (
        <div className='location-events'>
            <header>
                <div className='location-image'>
                    <img src={location.image} alt={location.name} />
                </div>

                <div className='location-info'>
                    <button className='back-btn' onClick={() => navigate('/')}>← Back to Locations</button>
                    <h2>{location.name}</h2>
                    <p>{location.address}, {location.city}, {location.state} {location.zip}</p>
                    <p className='location-description'>{location.description}</p>
                </div>
            </header>

            <main>
                {events && events.length > 0 ? (
                    events.map(event => (
                        <Event
                            key={event.id}
                            id={event.id}
                            title={event.title}
                            date={event.date}
                            time={event.time}
                            image={event.image}
                        />
                    ))
                ) : (
                    <h2><i className="fa-regular fa-calendar-xmark fa-shake"></i> No events scheduled at this location yet!</h2>
                )}
            </main>
        </div>
    )
}

export default LocationEvents
