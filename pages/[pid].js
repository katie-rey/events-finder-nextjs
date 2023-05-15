import fs from 'fs/promises' // can only run on the server side or inside of getStaticProps
import path from 'path'

import { Fragment } from 'react'

function ProductDetailsPage(props) {
  const { loadedProduct } = props

  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  )
}

//For dynamic pages (named with [], we require getStaticPaths())
// Tells  next it wil need to pre-render multiple instances of this page i.e. with id1, id2 etc

export async function getStaticProps(context) {
  const { params } = context
  const productId = params.pid

  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json')
  const jsonData = await fs.readFile(filePath)
  const data = JSON.parse(jsonData)

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

export async function getStaticPaths() {
  return {
    paths: [{ params: { pid: 'p1' } }, { params: { pid: 'p2' } }, { params: { pid: 'p3' } }],
    fallback: false,
  }
}

export default ProductDetailsPage
