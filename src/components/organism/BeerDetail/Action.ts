import { ActionCreator, Dispatch, AnyAction } from 'redux'
import { AxiosResponse, AxiosError } from 'axios'
import {
  FetchActionType,
  FetchSuccessActionType,
  itemType,
  SetFetch,
  FetchErrorActionType,
} from './type'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import Fetch, { ServerProps } from './../../../libs/fetch'
import { ERROR_MESSAGE } from './../../../config/message'
import { BEER_BY_ID } from './../../../config/api'

export const isFetching = (isFetching: boolean): SetFetch => {
  return { type: 'SET_FETCHING_DETAIL', isFetching }
}

export const FetchBeerDetail = (id: number) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    const showLoader: SetFetch = isFetching(true)
    dispatch(showLoader)
    const serverProps: ServerProps = {
      url: BEER_BY_ID.replace('{ID}', String(id)),
    }

    return Fetch(serverProps)
      .then((response: AxiosResponse) => {
        const fetchBeersSuccess: FetchSuccessActionType = {
          type: 'FETCH_BEER_DETAIL_SUCCESS',
          item: response.data,
        }
        dispatch(fetchBeersSuccess)
      })
      .catch((err: AxiosError) => {
        const fetchBeersSuccess: FetchErrorActionType = {
          type: 'FETCH_BEER_DETAIL_ERROR',
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
