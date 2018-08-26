import * as React from 'react'
import { observer } from 'mobx-react'
import { AppContextProps, consumeStore } from '../state/consume'
import { Select, Layout } from 'antd'
import { TimeEntriesListContainer } from '../components/TimeEntriesListContainer'
import { TimerForm } from '../components/TimerForm'

@consumeStore
@observer
export class TimerContainer extends React.Component<AppContextProps> {
  render () {
    return (
      <React.Fragment>
        <TimerForm />
        <Layout.Content style={{ borderLeft: '5px red', marginTop: '70px' }}>
          <br />
          <TimeEntriesListContainer />
        </Layout.Content>
      </React.Fragment>
    )
  }
}
