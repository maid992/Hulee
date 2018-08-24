import { Layout, Button, Row, Col } from 'antd'
import { observer } from 'mobx-react'
import * as React from 'react'

import { AppContext, AppContextProps, consume } from './consume'

@consume(AppContext.Consumer)
@observer
export class Timer extends React.Component<AppContextProps> {
  render () {
    const { getStartTime, getEndTime, getDuration, isRunning } = this.props.timerState
    return (
      <Layout style={{ width: '100%' }}>
        <Row>
          <Col span={12}>
            <h2>{this.props.timerState.timer.display}</h2>
            {!isRunning ? (
              <Button
                style={{ borderRadius: '30px' }}
                onClick={() => this.props.timerState.startTimeEntry()}
              >
                START
              </Button>
            ) : (
              <Button
                // disabled={!isRunning}
                style={{ borderRadius: '30px' }}
                type="danger"
                onClick={() => this.props.timerState.stopTimeEntry()}
              >
                Log Time
              </Button>
            )}
          </Col>
        </Row>
      </Layout>
    )
  }
}
