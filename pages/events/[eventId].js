import { useRouter } from 'next/router'

import { getFeaturedEvents } from '../data/dummy-data'

function EventDetailPage(props) {
  const router = useRouter()

  const eventId = router.query.eventId

  const eventById = getEventItemById(eventId)

  if (!eventById) {
    return <p>No event found</p>
  }

  return (
    <div className="">
      <h1 className="">Single Event</h1>
    </div>
  )
}

export default EventDetailPage
