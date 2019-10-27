import React, { FunctionComponent } from 'react'
import Layout from './../components/templates/Layout'
import BeerList from './../components/organism/BeerList'

type BeerListProps = {}

const BeerListPage: FunctionComponent<BeerListProps> = (props) => (
  <Layout>
    <BeerList />
  </Layout>
)

export default BeerListPage
