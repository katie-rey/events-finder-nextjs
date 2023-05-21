import fs from 'fs/promises' // can only run on the server side or inside of getStaticProps
import path from 'path'

import { Fragment } from 'react'

function ProductDetailsPage(props) {
  const { loadedProduct } = props

  if (!loadedProduct) {
    return <p>Loading ...</p>
  }

  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  )
}

//For dynamic pages (named with [], we require getStaticPaths())
// Tells  next it wil need to pre-render multiple instances of this page i.e. with id1, id2 etc

async function getData() {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json')
  const jsonData = await fs.readFile(filePath)
  const data = JSON.parse(jsonData)

  return data
}

export async function getStaticProps(context) {
  const { params } = context
  const productId = params.pid

  const product = data.products.find((product) => product.id === productId)

  return {
    props: {
      loadedProduct: product,
    },
    // ISR (incremental static regeneration)
    // pre-rendered page which regenerates as per second request below
    revalidate: 60,
  }
}

// pre-rendering props for the different pages with unique params/ids
export async function getStaticPaths() {
  const data = await getData()

  const ids = data.products.map((product) => product.id)

  const pathsWithParams = ids.map((id) => ({ params: { pid: id } }))

  return {
    // paths: [{ params: { pid: 'p1' } }, { params: { pid: 'p2' } }, { params: { pid: 'p3' } }],
    // fallback: false,
    paths: pathsWithParams,
    // fallback: true, // page are rendered 'just in time'
    // fallback: 'blocking', // page are rendered
    fallback: false, // page are rendered
  }
}

export default ProductDetailsPage
