import { Layout, Button, Row, Col, Icon } from 'antd'
import { observer } from 'mobx-react'
import * as React from 'react'

import { AppContext, AppContextProps, consume } from './consume'

@consume(AppContext.Consumer)
@observer
export class Timer extends React.Component<AppContextProps> {
  render () {
    const { isRunning } = this.props.timerState
    return (
      <Layout style={{ background: '#fff' }}>
        <Row type="flex" justify="end" align="middle">
          <Col span={12}>
            <h2 style={{ margin: '0px 0px', padding: '0 10px' }}>
              {this.props.timerState.timer.display}
            </h2>
          </Col>
          <Col span={12} style={{ paddingRight: '0px' }}>
            {!isRunning ? (
              <Icon
                style={{ fontSize: '300%' }}
                onClick={() => this.props.timerState.startTimeEntry()}
                className="icon"
                type="play-circle"
                title="Start Time"
              />
            ) : (
              <Icon
                style={{ fontSize: '300%' }}
                onClick={() => this.props.timerState.stopTimeEntry()}
                className="icon"
                type="check-circle"
                title="Log Time"
              />
            )}
          </Col>
        </Row>
      </Layout>
    )
  }
}
