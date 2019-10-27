import { Reducer } from 'redux'
import { ReducerState, ReducerAction } from './type'

export const initialState: ReducerState = {
  list: [],
  isFetching: false,
  errorMessage: '',
}

const BeerListReducer: Reducer<ReducerState, ReducerAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case 'SET_FETCHING':
      return { ...state, isFetching: action.isFetching }
    case 'FETCH_BEERS_SUCCESS':
      return { ...state, errorMessage: '', list: action.list }
    case 'FETCH_BEERS_ERROR':
      return { ...state, errorMessage: action.message }
    default:
      return state
  }
}

export default BeerListReducer
