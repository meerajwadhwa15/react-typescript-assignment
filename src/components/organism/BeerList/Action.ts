import { AnyAction } from 'redux'
import { AxiosResponse, AxiosError } from 'axios'
import { FetchSuccessActionType, SetFetch, FetchErrorActionType } from './type'
import { ThunkDispatch } from 'redux-thunk'
import Fetch, { ServerProps } from './../../../libs/fetch'
import { ERROR_MESSAGE } from './../../../config/message'
import { BEER_LIST } from './../../../config/api'

export const isFetching = (isFetching: boolean): SetFetch => {
  return { type: 'SET_FETCHING', isFetching }
}

export const FetchBeers = () => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    const showLoader: SetFetch = isFetching(true)
    dispatch(showLoader)
    const serverProps: ServerProps = {
      url: BEER_LIST,
    }

    return Fetch(serverProps)
      .then((response: AxiosResponse) => {
        const fetchBeersSuccess: FetchSuccessActionType = {
          type: 'FETCH_BEERS_SUCCESS',
          list: response.data,
        }
        dispatch(fetchBeersSuccess)
      })
      .catch((err: AxiosError) => {
        const fetchBeersSuccess: FetchErrorActionType = {
          type: 'FETCH_BEERS_ERROR',
          message: ERROR_MESSAGE,
        }
        dispatch(fetchBeersSuccess)
      })
      .finally(() => {
        const hideLoader: SetFetch = isFetching(false)
        dispatch(hideLoader)
      })
  }
}
