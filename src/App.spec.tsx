import React from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import { renderWithRouter, fireEvent, waitForElement } from 'test-utils'
import App from './App'

const mockStore = configureMockStore()

describe('home', () => {
  it('links beer names to the detail view of the relevant beer', async () => {
    const store = mockStore({
      BeerListReducer: {
        list: [
          {
            id: 1,
            name: 'Buzz',
            image_url: 'image_url',
            tagline: 'tagline',
            volume: {
              value: 20,
              unit: 'litres',
            },
          },
          {
            id: 2,
            name: 'Bad Pixie',
            image_url: 'image_url',
            tagline: 'tagline',
            volume: {
              value: 20,
              unit: 'litres',
            },
          },
        ],
        isFetching: false,
      },
      BeerDetailReducer: {
        item: {
          id: 1,
          name: 'Buzz',
        },
        isFetching: false,
      },
    })

    const { getByText, history } = renderWithRouter(
      <>
        <Provider store={store}>
          <App />
          <Route
            path="/:id"
            render={({ match }) => <div>matching id: {match.params.id}</div>}
          />
        </Provider>
      </>
    )

    const firstBeerHeader = await waitForElement(() => getByText(/Buzz/i))
    const leftClick = { button: 0 }
    fireEvent.click(firstBeerHeader, leftClick)
    expect(getByText(/matching id: 1/)).toBeTruthy()

    history.goBack()
    const lastBeerHeader = await waitForElement(() => getByText(/Bad Pixie/i))
    fireEvent.click(lastBeerHeader)
    expect(getByText(/matching id: 2/)).toBeTruthy()
  })
})

describe('detail', () => {
  it('displays the description of the beer routed to', async () => {
    const store = mockStore({
      BeerDetailReducer: {
        item: {
          id: 7,
          name: 'ABC',
          volume: {
            value: 20,
            unit: 'litres',
          },
          description:
            'An Imperial Black Belgian Ale aged in old Invergordon Scotch whisky barrels with mountains of raspberries, tayberries and blackberries in each cask. Decadent but light and dry, this beer would make a fantastic base for ageing on pretty much any dark fruit - we used raspberries,tayberries and blackberries beause they were local.. This could be because the text is broken up by multiple elements. In this case, you can provide a function for your text matcher to make your matcher more flexible.',
        },
        isFetching: false,
        match: {
          params: {
            id: 7,
          },
        },
      },
    })
    const startingRoute = '/7'
    const { getByText } = renderWithRouter(
      <>
        <Provider store={store}>
          <App />
          <Route
            path="/:id"
            render={({ match }) => <div>matching id: {match.params.id}</div>}
          />
        </Provider>
      </>,
      { route: startingRoute }
    )

    const description = getByText(
      /An Imperial Black Belgian Ale aged in old Invergordon Scotch whisky barrels with mountains of raspberries, tayberries and blackberries in each cask. Decadent but light and dry, this beer would make a fantastic base for ageing on pretty much any dark fruit - we used raspberries,tayberries and blackberries beause they were local.. This could be because the text is broken up by multiple elements. In this case, you can provide a function for your text matcher to make your matcher more flexible./i
    )

    expect(description).toBeTruthy()
  })
})
