import React, { FunctionComponent, ReactNode, Component, Fragment } from 'react'
import { Dispatch } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import {
  ComponentProps,
  ReducerState,
  BeerDetailReducerType,
  DispatchProps,
  ComponentState,
} from './type'
import Img from './../../atoms/Img'
import { connect } from 'react-redux'
import { FetchBeerDetail } from './Action'
import Loader from './../../molecules/Loader'
import ErrorMessage from './../../atoms/ErrorMessage'
import NoRecordFound from './../../atoms/NoRecordFound'
import FoodPairing from './../../molecules/FoodPairing'
import './Style.css'

export const mapStateToProps = ({
  BeerDetailReducer: { item, isFetching, errorMessage },
}: BeerDetailReducerType): ReducerState => ({
  item,
  isFetching,
  errorMessage,
})

export const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>
): DispatchProps => ({
  fetchBeerDetailAction: (id: number) => {
    dispatch(FetchBeerDetail(id))
  },
})

export type Props = ReducerState & DispatchProps & ComponentProps

export class BeerDetail extends Component<Props, ComponentState> {
  componentDidMount() {
    const id = parseInt(this.props.match.params.id, 10)
    if (!this.props.item || !this.props.item.id || this.props.item.id !== id) {
      this.props.fetchBeerDetailAction(id)
    }
  }

  render() {
    const { item, isFetching, errorMessage } = this.props

    return (
      <div>
        {isFetching ? (
          <Loader />
        ) : errorMessage ? (
          <ErrorMessage>{errorMessage}</ErrorMessage>
        ) : item.id ? (
          <div className="item-detail">
            <div>
              <Img src={item.image_url} height="300" alt={item.tagline} />
            </div>
            <div className="detail">
              <h2>{item.name}</h2>
              <div>{item.tagline}</div>
              <div>
                {item.volume ? item.volume.value : null}{' '}
                {item.volume ? item.volume.unit : null}
              </div>
              <p>{item.description}</p>
              <FoodPairing foodPairing={item.food_pairing} />
              <div>
                <strong className="label">Brew Date:</strong>&nbsp;
                {item.first_brewed}
              </div>
            </div>
          </div>
        ) : (
          <NoRecordFound>No Record Found.</NoRecordFound>
        )}
      </div>
    )
  }
}

// Now let's connect our component!
export default connect<
  ReducerState,
  DispatchProps,
  ComponentProps,
  BeerDetailReducerType
>(
  mapStateToProps,
  mapDispatchToProps
)(BeerDetail)
