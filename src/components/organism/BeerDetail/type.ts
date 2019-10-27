import { Action, ActionCreator } from 'redux'
import { StringLiteral } from '@babel/types'
import ErrorMessage from 'components/atoms/ErrorMessage'

export type itemType = {
  id: number
  image_url: string
  name: string
  tagline: string
  volume: {
    value: number
    unit: string
  }
  description: string
  food_pairing: [string]
  first_brewed: string
}

export type ComponentProps = {
  match: {
    params: {
      id: string
    }
  }
}

export type ComponentState = {}

export interface ReducerState {
  item: itemType
  isFetching: boolean
  errorMessage: string
}

export interface DispatchProps {
  fetchBeerDetailAction: (id: number) => void
}

export type ReducerInitialeState = {
  item: {}
  isFetching: boolean
}

export type BeerDetailReducerType = {
  BeerDetailReducer: {
    item: itemType
    isFetching: boolean
    errorMessage: string
  }
}

export type ReducerAction = {
  type: string
  item: itemType[]
  isFetching: boolean
  message: string
}

export interface FetchActionType extends Action {
  type: 'FETCH_BEER_DETAIL'
}

export interface FetchSuccessActionType extends Action {
  type: 'FETCH_BEER_DETAIL_SUCCESS'
  item: itemType
}

export interface SetFetch {
  type: 'SET_FETCHING_DETAIL'
  isFetching: boolean
}

export type FetchErrorActionType = {
  type: string
  message: string
}
