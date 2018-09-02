import { Layout } from 'antd'
import { observer } from 'mobx-react'
import * as React from 'react'

import { AppContextProps, consumeStore } from '../state/consume'
import { Sidebar } from './Sidebar'
import { TimerContainer } from './TimerContainer'

const { Content } = Layout

@consumeStore
@observer
export class ManagmentApp extends React.Component<AppContextProps> {
  render () {
    return (
      <Layout>
        <Sidebar />
        <Layout style={{ padding: '0 0', background: '#fff', marginLeft: '180px' }}>
          <Content
            style={{
              padding: '0 0',
              minHeight: '100vh',
              backgroundColor: '#f9fbfc'
            }}
          >
            <TimerContainer />
          </Content>
        </Layout>
      </Layout>
    )
  }
}
