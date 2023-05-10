import { getFilteredEvents } from '../../data/dummy-data'
import { useRouter } from 'next/router'
import EventList from '../../components/events/EventList'

function FilteredEvents() {
  const router = useRouter()
  const filterData = router.query.slug

  if (!filterData) {
    return <p className="center">Loading...</p>
  }

  const filteredYear = filterData[0]
  const filteredMonth = filterData[1]

  const numYear = +filteredYear
  const numMonth = +filteredMonth

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear < 2021 ||
    numYear > 2030 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return <p>Invalid filter, please adjust your values.</p>
  }

  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth,
  })

  if (!filteredEvents || filteredEvents.length === 0) {
    return <p>No events found</p>
  }

  return (
    <div className="">
      <h1 className="">Selected Events</h1>
      <EventList items={filteredEvents} />
    </div>
  )
}

export default FilteredEvents
