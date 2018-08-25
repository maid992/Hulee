import React from 'react'
import { observer } from 'mobx-react'
import { AppContextProps, consumeStore } from './consume'
import { Select, Layout } from 'antd'
import { TimeEntriesListContainer } from './TimeEntriesListContainer'
import { TimerForm } from './TimerForm'

@consumeStore
@observer
export class TimerContainer extends React.Component<AppContextProps> {
  render () {
    return (
      <React.Fragment>
        {/* <h2>{this.props.locationState.currentPage}</h2> */}
        <TimerForm />
        <Layout.Content style={{borderLeft: '5px red', marginTop: '70px'}}>
          <br/>
          <TimeEntriesListContainer />
        </Layout.Content>
      </React.Fragment>
    )
  }
}
