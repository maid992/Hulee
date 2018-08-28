import * as React from 'react'
import { AppContextProps, consumeStore } from '../state/consume'
import { observer } from 'mobx-react'
import { TimeEntriesListItem } from './TimeEntriesListItem'
import { TimeEntryModel } from '../state/TimeEntryModel'
import { Row } from 'antd'

@consumeStore
@observer
export class TimeEntriesList extends React.Component<
  AppContextProps & { listItems?: TimeEntryModel[]; keys?: string }
> {
  render () {
    return (
      <React.Fragment>
        <Row style={{ marginBottom: '40px', backgroundColor: '#fff' }}>
          <div
            style={{
              margin: '0 0',
              padding: '0px 20px',
              paddingTop: '20px',
              fontWeight: 500,
              color: '#222222',
              minHeight: '55px'
            }}
          >
            <span>{this.props.keys}</span>
          </div>
          <ul style={{ margin: '0 0', padding: '0 5px' }}>
            {this.props.listItems.map((item) => (
              <li style={{ listStyleType: 'none', width: '100%' }} key={item.getId}>
                <TimeEntriesListItem listItem={item} />
              </li>
            ))}
          </ul>
        </Row>
      </React.Fragment>
    )
  }
}

/*
Wolfenstein,
Dishonored,
Doom,
DarkSouls,
Bloodborne
*/
