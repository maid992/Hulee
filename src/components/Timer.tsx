import { Layout, Row, Col, Icon } from 'antd'
import { observer } from 'mobx-react'
import * as React from 'react'

import { AppContextProps, consumeStore } from '../state/consume'

@consumeStore
@observer
export class Timer extends React.Component<AppContextProps> {
  render () {
    const { isRunning } = this.props.timerStore
    return (
      <Layout style={{ background: '#fff' }}>
        <Row type="flex" justify="end" align="middle">
          <Col>
            <Icon
              className="icon"
              style={{ color: 'lightGrey', width: '55px' }}
              type="tag"
              title="Start Time"
            />
          </Col>
          <Col>
            <Icon
              style={{ color: 'lightGrey', width: '55px' }}
              className="icon"
              type="heart"
              title="Start Time"
            />
          </Col>
          <Col>
            <h2
              style={{
                margin: '0 20px 0 0px',
                padding: '0 10px',
                width: '70px',
                color: '#7b7b7b',
                fontSize: '20px'
              }}
            >
              {this.props.timerStore.timer.display}
            </h2>
          </Col>
          <Col style={{ paddingRight: '0px', width: '70px' }}>
            {!isRunning ? (
              <Icon
                style={{ fontSize: '300%', marginRight: '10px' }}
                onClick={() => this.props.timerStore.startTimeEntry()}
                className="icon"
                type="play-circle"
                title="Start Time"
              />
            ) : (
              <Icon
                style={{ fontSize: '300%' }}
                onClick={() => this.props.timerStore.stopTimeEntry()}
                className="icon"
                type="check-circle"
                title="Log Time"
              />
            )}
          </Col>
          <Col style={{ width: '50px', marginRight: '5px' }}>
            <Icon
              style={{ color: '#cecece' }}
              className="icon"
              type="tag"
              title="Start Time"
            />
            <Icon
              style={{ color: '#cecece' }}
              className="icon"
              type="clock-circle"
              title="Start Time"
            />
          </Col>
        </Row>
      </Layout>
    )
  }
}
