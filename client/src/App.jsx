import { useRoutes, Link } from 'react-router-dom'
import Locations from './pages/Locations'
import LocationEvents from './pages/LocationEvents'
import Events from './pages/Events'
import './App.css'

const App = () => {
  let element = useRoutes([
    {
      path: '/',
      element: <Locations />
    },
    {
      path: '/location/:id',
      element: <LocationEvents />
    },
    {
      path: '/events',
      element: <Events />
    }
  ])

  return (
    <div className='app'>
      <header className='main-header'>
        <h1>Twin Cities Coffee</h1>

        <div className='header-buttons'>
          <Link to='/' role='button'>Locations</Link>
          <Link to='/events' role='button'>All Events</Link>
        </div>
      </header>

      <main>
        {element}
      </main>
    </div>
  )
}

export default App
