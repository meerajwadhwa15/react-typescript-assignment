import React, { FunctionComponent } from 'react'
import Layout from './../components/templates/Layout'
import BeerDetail from './../components/organism/BeerDetail'

type Props = {
  match: {
    params: {
      id: string
    }
  }
}

const BeerDetailPage: FunctionComponent<Props> = (props) => (
  <Layout>
    <BeerDetail {...props} />
  </Layout>
)

export default BeerDetailPage
