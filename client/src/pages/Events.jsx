import { useState, useEffect } from 'react'
import Event from '../components/Event'
import EventsAPI from '../services/EventsAPI'
import LocationsAPI from '../services/LocationsAPI'
import '../css/Events.css'

const Events = () => {
    const [events, setEvents] = useState([])
    const [locations, setLocations] = useState([])
    const [filterLocationId, setFilterLocationId] = useState('all')

    useEffect(() => {
        (async () => {
            try {
                const [eventsData, locationsData] = await Promise.all([
                    EventsAPI.getAllEvents(),
                    LocationsAPI.getAllLocations()
                ])
                setEvents(eventsData)
                setLocations(locationsData)
            } catch (error) {
                console.error('Failed to load events:', error)
            }
        })()
    }, [])

    const filteredEvents = filterLocationId === 'all'
        ? events
        : events.filter(e => String(e.location_id) === filterLocationId)

    return (
        <div className='events-page'>
            <div className='events-header'>
                <h2>All Events</h2>
                <select
                    value={filterLocationId}
                    onChange={e => setFilterLocationId(e.target.value)}
                    className='location-filter'
                >
                    <option value='all'>All Locations</option>
                    {locations.map(loc => (
                        <option key={loc.id} value={String(loc.id)}>{loc.name}</option>
                    ))}
                </select>
            </div>

            <div className='events-grid'>
                {filteredEvents.length > 0 ? (
                    filteredEvents.map(event => (
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
                    <h2><i className="fa-regular fa-calendar-xmark fa-shake"></i> No events scheduled yet!</h2>
                )}
            </div>
        </div>
    )
}

export default Events
