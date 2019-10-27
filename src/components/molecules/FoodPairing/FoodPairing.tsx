import React, { FunctionComponent, Fragment, ReactElement } from 'react'
import './Style.css'

export type Props = {
  foodPairing: [string]
}

const BeerList: FunctionComponent<Props> = ({ foodPairing }) => (
  <div>
    {foodPairing && foodPairing.length ? (
      <Fragment>
        <strong className="label">Food Pairing:</strong>
        <ol>
          {foodPairing.map(
            (foodPair: string, index: number): ReactElement => (
              <li key={index}>{foodPair}</li>
            )
          )}
        </ol>
      </Fragment>
    ) : null}
  </div>
)

export default BeerList
