import React, { Component, Children } from 'react'
import ReactDOM from 'react-dom'
import { AppState } from './AppState'
import { observer } from 'mobx-react'
import { Provider } from './consume'
import { ProjectTable } from './ProjectTable';

// first we will make a new context

const appState = new AppState()

@observer
class App extends React.Component {
  render () {
    return (
      <div>
        <ProjectTable />
      </div>
    )
  }
}

ReactDOM.render(
  <Provider state={appState}>
    <App />
  </Provider>,
  document.getElementById('app') as HTMLElement
)

// window.state = state
