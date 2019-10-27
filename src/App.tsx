import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import BeerListPage from './pages/BeerList'
import BeerDetailPage from './pages/BeerDetail'
import ErrorBoundary from './ErrorBoundry'

const App: React.FC = (props) => (
  <>
    <ErrorBoundary>
      <Switch>
        <Route exact path="/" component={BeerListPage} />
        <Route path="/:id" component={BeerDetailPage} />
      </Switch>
    </ErrorBoundary>
  </>
)

export default App
