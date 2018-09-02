import * as React from 'react'
import { AppContextProps, consumeStore } from '../state/consume'
import { observer } from 'mobx-react'
import { TimeEntriesListItem } from './TimeEntriesListItem'
import { TimeEntryModel } from '../state/TimeEntryModel'
import { Row, Col } from 'antd'
import * as moment from 'moment'
import { PopdownContent } from './PopdownContent/PopdownContent'

@consumeStore
@observer
export class TimeEntriesList extends React.Component<
  AppContextProps & { listItems?: TimeEntryModel[]; keys?: string }
> {
  render () {
    const totalTime: number = this.props.listItems
      .reduce((a: number[], b: any) => {
        const s = moment(b.duration, 'H:mm:ss').diff(
          moment().startOf('day'),
          'millisecond'
        )
        return [ ...a, s ]
      }, [])
      .reduce((a: number, b: number) => a + b, 0)

    const totalTimeFormated: string = moment
      .utc(moment.duration(totalTime, 'milliseconds').asMilliseconds())
      .format('H:mm:ss')

    return (
      <React.Fragment>
        <Row
          style={{
            marginTop: '40px',
            borderTop: '1px solid rgba(103, 209, 124, 0.8)',
            backgroundColor: '#fff',
            boxShadow: '0 3px 3px -2px #e8e8e8'
          }}
        >
          <div
            style={{
              margin: '0 0',
              padding: '12px 0px 0px 25px',
              fontWeight: 600,
              color: '#222222',
              minHeight: '40px',
              flexDirection: 'column',
              width: '100%'
            }}
          >
            <Col span={6}>{this.props.keys}</Col>
            <Col
              style={{
                width: '100px',
                marginLeft: 'auto',
                marginRight: '55px',
                color: 'black'
              }}
            >
              {totalTimeFormated}
            </Col>
          </div>
          <ul style={{ margin: '0 0', padding: '0 5px' }}>
            {this.props.listItems.map((item) => (
              <li
                className="listItem"
                style={{ listStyleType: 'none', width: '100%' }}
                key={item.getId}
              >
                <TimeEntriesListItem listItem={item}>
                  {(listItem: TimeEntryModel) => <PopdownContent listItem={listItem} />}
                </TimeEntriesListItem>
              </li>
            ))}
          </ul>
        </Row>
      </React.Fragment>
    )
  }
}
