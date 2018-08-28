import * as React from 'react'
import { AppContextProps, consumeStore } from '../state/consume'
import { observer } from 'mobx-react'
import { utc } from 'moment'

import { TimeEntriesList } from './TimeEntriesList'
import { Row } from 'antd'

@consumeStore
@observer
export class TimeEntriesListContainer extends React.Component<AppContextProps> {
  render () {
    const timeEntries = this.props.timeTrackingState.sortedAndGroupedTimeEntries
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

const handleTime = (time: string): string => {
  const mTime = utc(time)

  if (mTime.isSame(new Date(), 'day')) {
    return 'Today'
  } else if (mTime.add(1, 'day').isSame(new Date(), 'day')) {
    return 'Yesterday'
  }

  return mTime.format('ddd, DD MMM')
}
