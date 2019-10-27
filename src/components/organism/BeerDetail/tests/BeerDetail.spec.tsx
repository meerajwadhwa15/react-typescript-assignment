import React from 'react'
import { shallow } from 'enzyme'
import { BeerDetail, mapStateToProps, Props } from './../BeerDetail'
import { create } from 'react-test-renderer'
import { BrowserRouter } from 'react-router-dom'

const sampleLoadingMockData: Props = {
  fetchBeerDetailAction: jest.fn(),
  item: {},
  isFetching: true,
  match: {
    params: {
      id: '1',
    },
  },
}

const sampleListMockData: Props = {
  fetchBeerDetailAction: jest.fn(),
  item: {
    id: 1,
    image_url: 'https://images.punkapi.com/v2/keg.png',
    name: 'Buzz',
    tagline: 'A Real Bitter Experience.',
    volume: {
      value: 20,
      unit: 'litres',
    },
  },
  isFetching: false,
  match: {
    params: {
      id: '1',
    },
  },
}

const ComponentWithLoading = () => (
  <BrowserRouter>
    <BeerDetail {...sampleListMockData} />
  </BrowserRouter>
)

const ComponentWithList = () => (
  <BrowserRouter>
    <BeerDetail {...sampleLoadingMockData} />
  </BrowserRouter>
)

describe('BeerList Enzyme testing', () => {
  it('renders with Loading without crashing', () => {
    shallow(<ComponentWithLoading />)
  })

  it('renders with beerList without crashing', () => {
    shallow(<ComponentWithList />)
  })

  test('Matches the snapshot with beer List', () => {
    const component = create(<ComponentWithList />)
    expect(component.toJSON()).toMatchSnapshot()
  })

  test('Matches the snapshot without beer list', () => {
    const component = create(<ComponentWithLoading />)
    expect(component.toJSON()).toMatchSnapshot()
  })

  test('Should call fetchBeersAction ', () => {
    const spy = jest.spyOn(sampleLoadingMockData, 'fetchBeerDetailAction')
    const component = create(<BeerDetail {...sampleLoadingMockData} />)
    const instance = component.getInstance()
    instance.componentDidMount()
    expect(spy).toBeCalled()
  })

  test('Should test mapStateToProps', () => {
    expect(
      mapStateToProps({
        BeerDetailReducer: {
          item: {},
          isFetching: false,
        },
      })
    ).toEqual({
      item: {},
      isFetching: false,
    })
  })
})
