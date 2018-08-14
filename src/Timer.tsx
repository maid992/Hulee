import { Layout, Button, Row, Col } from 'antd'
import { observer } from 'mobx-react'
import * as React from 'react'

import { AppContext, AppContextProps, consume } from './consume'

@consume(AppContext.Consumer)
@observer
export class Timer extends React.Component<AppContextProps> {
  render () {
    const { getStartTime, getEndTime } = this.props.timerState
    return (
      <Layout style={{ width: '100%' }}>
        <Row>
          <Col span={12}>
            <h2>{(this.props.timerState.timer.milliSeconds * 0.001).toFixed()}</h2>
            <h4>Start Time: {getStartTime}</h4>
            <h4>End Time: {getEndTime}</h4>
            <Button
              style={{ borderRadius: '30px' }}
              onClick={() => this.props.timerState.startTimer()}
            >
              START
            </Button>
            <Button
              style={{ borderRadius: '30px' }}
              type="danger"
              onClick={() => this.props.timerState.stopTimer()}
            >
              STOP
            </Button>
          </Col>
        </Row>
      </Layout>
    )
  }
}
