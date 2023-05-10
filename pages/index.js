import { getFeaturedEvents } from '../data/dummy-data'
import EventList from '../components/events/EventList'
import EventSearch from '../components/events/EventSearch'

function HomePage() {
  const featuredEvents = getFeaturedEvents()

  return (
    <div>

      <EventList items={featuredEvents} />
    </div>
  )
}

export default HomePage
