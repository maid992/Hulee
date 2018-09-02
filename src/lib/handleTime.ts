import * as moment from 'moment'

export const handleTime = (time: string): string => {
  const mTime: moment.Moment = moment.utc(time)
  if (time === moment().format('D MMMM YYYY')) {
    return 'Today'
  } else if (time === moment().subtract(1, 'day').format('D MMMM YYYY')) {
    return 'Yesterday'
  }

  return mTime.format('ddd, DD MMM')
}
