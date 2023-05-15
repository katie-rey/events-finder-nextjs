import fs from 'fs/promises' // can only run on the server side or inside of getStaticProps
import path from 'path'

import Link from 'next/link'

import { getFeaturedEvents } from '../data/dummy-data'
import EventList from '../components/events/EventList'
import EventSearch from '../components/events/EventSearch'

function HomePage(props) {
  const featuredEvents = getFeaturedEvents()

  const { products } = props

  return (
    <div>
      {/* <EventList items={featuredEvents} /> */}
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link href={`/${product.id}`}>{product.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

// getStaticProps returns an object
// must have a props key ('props' below)
// all occurs as part of the build process
// not executed on the client side
// good for authentication

export async function getStaticProps(context) {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json')
  const jsonData = await fs.readFile(filePath)
  const data = JSON.parse(jsonData)

  if (!data) {
    return {
      redirect: {
        destination: '/no-data',
      },
    }
  }

  if (data.length === 0) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      products: data.products,
    },
    // ISR (incremental static regeneration)
    // pre-rendered page which regenerates as per second request below
    revalidate: 60,
  }
}

export default HomePage
