import * as React from 'react'
// import { Layout, Menu, Icon } from 'antd'
import { AppContextProps, consumeStore } from './consume'
import { observer } from 'mobx-react'
import { TimeEntriesListItem } from './TimeEntriesListItem'
import { TimeEntryModel } from './TimeTrackingStore'

@consumeStore
@observer
export class TimeEntriesList extends React.Component<
  AppContextProps & { listItems?: TimeEntryModel[]; keys?: string }
> {
  render () {
    return (
      <React.Fragment>
        <h3>{this.props.keys}</h3>
        <ul>
          {this.props.listItems.map((a) => (
            <div key={a.getId}>
              <TimeEntriesListItem listItem={a} />
            </div>
          ))}
        </ul>
      </React.Fragment>
    )
  }
}
