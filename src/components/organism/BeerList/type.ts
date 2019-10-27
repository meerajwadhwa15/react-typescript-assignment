export type listType = {
  id: number
  image_url: string
  name: string
  tagline: string
  volume: {
    value: number
    unit: string
  }
}

export interface ComponentProps {}

export interface ComponentState {}

export interface ReducerState {
  list: listType[]
  isFetching: boolean
  errorMessage: string
}

export interface DispatchProps {
  fetchBeersAction: () => void
}

export interface BeerListReducerType {
  BeerListReducer: {
    list: listType[]
    isFetching: boolean
    errorMessage: string
  }
}

export interface ReducerAction {
  type: string
  list: listType[]
  isFetching: boolean
  message: string
}

export type FetchSuccessActionType = {
  type: string
  list: listType[]
}

export interface SetFetch {
  type: string
  isFetching: boolean
}

export type FetchErrorActionType = {
  type: string
  message: string
}
