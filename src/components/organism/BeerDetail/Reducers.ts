import { Reducer } from 'redux'
import {
  ReducerState,
  ReducerAction,
  itemType,
  ReducerInitialeState,
} from './type'

export const initialState: ReducerInitialeState = {
  item: {},
  isFetching: false,
}

const BeerDetailReducer: Reducer<ReducerInitialeState, ReducerAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case 'SET_FETCHING_DETAIL':
      return { ...state, isFetching: action.isFetching }
    case 'FETCH_BEER_DETAIL_SUCCESS':
      return { ...state, item: action.item[0] }
    case 'FETCH_BEER_DETAIL_ERROR':
      return { ...state, errorMessage: action.message }
    default:
      return state
  }
}

export default BeerDetailReducer
