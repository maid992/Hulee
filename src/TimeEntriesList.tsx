import * as React from 'react'
// import { Layout, Menu, Icon } from 'antd'
import { AppContextProps, consumeStore } from './consume'
import { observer } from 'mobx-react'
import { TimeEntriesListItem } from './TimeEntriesListItem'
import { TimeEntryModel } from './TimeTrackingStore'
import { Row } from 'antd'

@consumeStore
@observer
export class TimeEntriesList extends React.Component<
  AppContextProps & { listItems?: TimeEntryModel[]; keys?: string }
> {
  render () {
    return (
      <React.Fragment>
        <Row style={{ paddingBottom: '20px' }} >
          <span style={{margin: '0 0', padding: '0 20px', fontWeight: 500, color: '#222222'}}>{this.props.keys}</span>
          <ul style={{ margin: '0 0', padding: '0 5px'}}>
              {this.props.listItems.map((item) => (
                <li style={{listStyleType: 'none', width: '100%'}} key={item.getId}>
                  <TimeEntriesListItem listItem={item} />
                </li>
              ))}
          </ul>
        </Row>
      </React.Fragment>
    )
  }
}
