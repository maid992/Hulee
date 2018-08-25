import * as React from 'react'
import { AppContextProps, consumeStore } from './consume'
import { observer } from 'mobx-react'
import moment from 'moment'

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
            <div key={a[1][0].getId}>
              <TimeEntriesList keys={handleTime(a[0])} listItems={a[1]} />
            </div>
          ))}
        </Row>
      </React.Fragment>
    )
  }
}

const handleTime = (time: string): string => {
  const mTime = moment.utc(time)

  if (mTime.isSame(new Date(), 'day')) {
    return 'Today'
  } else if (mTime.add(1, 'day').isSame(new Date(), 'day')) {
    return 'Yesterday'
  }

  return mTime.format('ddd, DD MMM')
}
