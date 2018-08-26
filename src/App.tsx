import * as React from 'react'
import { Provider } from './state/consume'
import { ManagmentApp } from './views/ManagmentApp'
import { AppState } from './state/AppState'
import { observer } from 'mobx-react'

const appState = new AppState()

const state = {
  timeTrackingState: appState.timeTrackingState,
  locationState: appState.locationState,
  timerState: appState.timerState
}

@observer
export class App extends React.Component {
  render () {
    return (
      <Provider {...state}>
        <ManagmentApp />
      </Provider>
    )
  }
}
