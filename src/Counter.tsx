import { Layout } from 'antd'
import { observer } from 'mobx-react'
import * as React from 'react'

import { AppContext, AppContextProps, consume } from './consume'

@consume(AppContext.Consumer)
@observer
export class Counter extends React.Component<AppContextProps> {
  render () {
    return (
      <Layout>
        <h1>d</h1>
      </Layout>
    )
  }
}
