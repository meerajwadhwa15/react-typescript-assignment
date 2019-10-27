import Reducers, { initialState } from './../Reducers'
import { ERROR_MESSAGE } from './../../../../config/message'

const fetchSuccessAction = {
  type: 'FETCH_BEER_DETAIL_SUCCESS',
  item: [{ id: 1 }],
}

const fetchErrorAction = {
  type: 'FETCH_BEER_DETAIL_ERROR',
  message: ERROR_MESSAGE,
}

describe('BeerDetail Reducers Unit test', function() {
  let state = {}
  test('should return the initial state', () => {
    expect(Reducers(initialState, {})).toEqual(initialState)
  })

  test('should handle "FETCH_BEER_DETAIL_SUCCESS" action', () => {
    expect(Reducers(initialState, fetchSuccessAction)).toEqual({
      ...initialState,
      item: fetchSuccessAction.item[0],
    })
  })

  test('should handle "SET_FETCHING_DETAIL"', () => {
    expect(Reducers(initialState, {
      type: 'SET_FETCHING',
      isFetching: false,
    })).toEqual({
      ...initialState,
      isFetching: false,
    })
  })

  test('should handle "FETCH_BEER_DETAIL_ERROR"', () => {
    expect(Reducers(initialState, fetchErrorAction)).toEqual({
      ...initialState,
      errorMessage: ERROR_MESSAGE,
    })
  })
})
