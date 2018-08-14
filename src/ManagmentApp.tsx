import { Layout } from 'antd';
import { observer } from 'mobx-react';
import * as React from 'react';

import { AppContext, AppContextProps, consume } from './consume';
import { Sidebar } from './Sidebar';
import { TimeTracking } from './TimeTracking';

const {Header, Content} = Layout

@consume(AppContext.Consumer)
@observer
export class ManagmentApp extends React.Component<AppContextProps> {
  render () {
    return (
      <Layout>
    <Header className="header">
      <div className="logo" />
    </Header>
    <Content style={{ padding: '50px 50px', height: '90vh' }}>
      <Layout style={{ padding: '24px 0', background: '#fff' }}>
        <Sidebar />
        <Content style={{ padding: '0 24px', minHeight: 400 }}>
          <TimeTracking />
        </Content>
      </Layout>
    </Content>
  </Layout>
    )
  }
}
