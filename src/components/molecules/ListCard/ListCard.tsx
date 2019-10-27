import React, { FunctionComponent } from 'react'
import Img from './../../atoms/Img'
import Anchor from './../../atoms/Anchor'
import './Style.css'

export type Props = {
  item: {
    id: number
    image_url: string
    name: string
    tagline: string
    volume: {
      value: number
      unit: string
    }
  }
}

const BeerList: FunctionComponent<Props> = ({ item }) => (
  <div className="card">
    <Anchor url={`/${item.id}`} title={item.name}>
      <div>
        <Img src={item.image_url} height="250" width="150" alt={item.tagline} />
      </div>
      <div>
        <h2>{item.name}</h2>
        <div>{item.tagline}</div>
        <div>
          {item.volume.value} {item.volume.unit}
        </div>
      </div>
    </Anchor>
  </div>
)

export default BeerList
