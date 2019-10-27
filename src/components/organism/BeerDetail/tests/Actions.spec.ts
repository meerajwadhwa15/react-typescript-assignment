import { isFetching, FetchBeerDetail } from './../Action'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'
import { ERROR_MESSAGE } from './../../../../config/message'
import { BEER_BY_ID } from './../../../../config/api'

const mock = new MockAdapter(axios)

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

const item = [
  {
    id: 1,
    image_url: 'https://images.punkapi.com/v2/keg.png',
    name: 'Buzz',
    tagline: 'A Real Bitter Experience.',
    volume: {
      value: 20,
      unit: 'litres',
    },
  },
]

describe('BeerList Action Unit test', function() {
  test('should create an action with correct type isFetching', () => {
    expect(isFetching(true)).toEqual({
      type: 'SET_FETCHING_DETAIL',
      isFetching: true,
    })
    expect(isFetching(false)).toEqual({
      type: 'SET_FETCHING_DETAIL',
      isFetching: false,
    })
  })

  it('should create an action with correct type FetchBeers (HAPPY SCENARIO)', () => {
    mock.onGet(BEER_BY_ID.replace('{ID}', '1')).reply(200, item)

    const expectedActions = {
      type: 'FETCH_BEER_DETAIL_SUCCESS',
      item,
    }

    const store = mockStore({ item })

    return store.dispatch(FetchBeerDetail(1)).then(() => {
      // return of async actions
      const listOfActions = store.getActions()
      expect(listOfActions[0]).toEqual({
        isFetching: true,
        type: 'SET_FETCHING_DETAIL',
      })

      expect(listOfActions[1]).toEqual(expectedActions)

      expect(listOfActions[2]).toEqual({
        isFetching: false,
        type: 'SET_FETCHING_DETAIL',
      })
    })
  })

  it('should create an action with correct type FetchBeers (ERROr SCENARIO)', () => {
    mock.onGet(BEER_BY_ID.replace('{ID}', '1')).reply(400)

    const expectedActions = {
      type: 'FETCH_BEER_DETAIL_ERROR',
      message: ERROR_MESSAGE,
    }

    const store = mockStore({ item })

    return store.dispatch(FetchBeerDetail(1)).then(() => {
      // return of async actions
      const listOfActions = store.getActions()
      expect(listOfActions[0]).toEqual({
        isFetching: true,
        type: 'SET_FETCHING_DETAIL',
      })

      expect(listOfActions[1]).toEqual(expectedActions)

      expect(listOfActions[2]).toEqual({
        isFetching: false,
        type: 'SET_FETCHING_DETAIL',
      })
    })
  })
})
