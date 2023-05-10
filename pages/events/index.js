import { useRouter } from 'next/router'

import { getAllEvents } from '../../data/dummy-data'
import EventList from '../../components/events/EventList'
import EventSearch from '../../components/events/EventSearch'

function AllEventsPage() {
  const router = useRouter()
  const allEvents = getAllEvents()

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`

    router.push(fullPath)
  }

  return (
    <div className="">
      <h1 className="">All Events</h1>
      <EventSearch onSearch={findEventsHandler} />
      <EventList items={allEvents} />
    </div>
  )
}

export default AllEventsPage
