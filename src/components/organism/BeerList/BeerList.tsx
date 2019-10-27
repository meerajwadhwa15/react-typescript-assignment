import React, { ReactNode, Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import ListCard from './../../molecules/ListCard'
import {
  listType,
  ComponentState,
  BeerListReducerType,
  ReducerState,
  DispatchProps,
  ComponentProps,
} from './type'
import { FetchBeers } from './Action'
import Loader from './../../molecules/Loader'
import ErrorMessage from './../../atoms/ErrorMessage'
import NoRecordFound from './../../atoms/NoRecordFound'
import './Style.css'

export const mapStateToProps = ({
  BeerListReducer: { list, isFetching, errorMessage },
}: BeerListReducerType): ReducerState => ({
  list,
  isFetching,
  errorMessage,
})

export const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>
): DispatchProps => ({
  fetchBeersAction: () => {
    dispatch(FetchBeers())
  },
})

export type Props = ReducerState & DispatchProps

export class BeerList extends Component<Props, ComponentState> {
  static defaultProps = {
    list: [],
  }

  componentDidMount() {
    const { list } = this.props
    if (!list.length) {
      this.props.fetchBeersAction()
    }
  }

  render(): ReactNode {
    const { list, isFetching, errorMessage } = this.props

    return (
      <div className="cards">
        {isFetching ? (
          <Loader />
        ) : errorMessage ? (
          <ErrorMessage>{errorMessage}</ErrorMessage>
        ) : list.length ? (
          list.map((item: listType) => <ListCard key={item.id} item={item} />)
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
  BeerListReducerType
>(
  mapStateToProps,
  mapDispatchToProps
)(BeerList)
