import * as React from 'react'
import { AppContextProps, consumeStore } from '../state/consume'
import { observer } from 'mobx-react'
import { Row } from 'antd'

import { handleTime } from '../lib/handleTime'
import { TimeEntriesList } from './TimeEntriesList'

@consumeStore
@observer
export class TimeEntriesListContainer extends React.Component<AppContextProps> {
  render () {
    const timeEntries = this.props.timeTrackingStore.sortedAndGroupedTimeEntries
    console.log(timeEntries)
    return (
      <React.Fragment>
        <Row>
          {timeEntries.map((a) => (
            <div key={a[0].date}>
              <TimeEntriesList keys={handleTime(a[0].date)} listItems={a} />
            </div>
          ))}
        </Row>
      </React.Fragment>
    )
  }
}
