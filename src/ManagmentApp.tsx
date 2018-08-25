import { Layout } from 'antd'
import { observer } from 'mobx-react'
import * as React from 'react'

import { AppContext, AppContextProps, consume } from './consume'
import { Sidebar } from './Sidebar'
import { TimerContainer } from './TimerContainer'

const { Header, Content } = Layout

@consume(AppContext.Consumer)
@observer
export class ManagmentApp extends React.Component<AppContextProps> {
  render () {
    return (
      <Layout>
        {/* <Header>HEADER</Header> */}
        <Layout>
          <Content style={{ padding: '0 0', minHeight: '90vh' }}>
            <Layout style={{ padding: '0 0', background: '#fff' }}>
              <Sidebar />
              {/* <div style={{ width: '10px', height: '100vh', background: '#722199' }} /> */}
              <Content
                style={{
                  padding: '0 0',
                  minHeight: '100vh'
                }}
              >
                <TimerContainer />
              </Content>
            </Layout>
          </Content>
        </Layout>
      </Layout>
    )
  }
}
