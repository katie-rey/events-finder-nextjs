import { Fragment } from 'react'
import { useRouter } from 'next/router'

import { getEventById } from '../../data/dummy-data'
import EventContent from '../../components/event-detail/EventContent'
import EventLogistics from '../../components/event-detail/EventLogistics'
import EventSummary from '../../components/event-detail/EventSummary'

function EventDetailPage() {
  const router = useRouter()

  const eventId = router.query.eventId
  const event = getEventById(eventId)
  console.log(event)
  // console.log(event.location)

  if (!event) {
    return <p>No event found</p>
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  )
}

export default EventDetailPage
