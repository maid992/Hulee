import { Layout } from 'antd'
import { observer } from 'mobx-react'
import * as React from 'react'

import { AppContext, AppContextProps, consume } from './consume'
import { Sidebar } from './Sidebar'
import { TimeTracking } from './TimeTracking'

const { Header, Content } = Layout

@consume(AppContext.Consumer)
@observer
export class ManagmentApp extends React.Component<AppContextProps> {
  render () {
    return (
      // <Layout style={{ background: 'fff', minHeight: '40vh' }}>
      //   <Sidebar />
      //   <Content style={{ width: '100vw' }}>
      //     <TimeTracking />
      //   </Content>
      // </Layout>

      <Layout>
        <Header>HEADER</Header>
        <Layout>
          <Content style={{ padding: '0 50px', minHeight: '80vh' }}>
            <Layout style={{ padding: '24px 0', background: '#fff' }}>
              <Sidebar />
              <Content style={{ padding: '0 24px', minHeight: 280 }}>
                <TimeTracking />
              </Content>
            </Layout>
          </Content>
        </Layout>
      </Layout>
    )
  }
}
