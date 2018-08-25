import { observable } from 'mobx'
import { TimeTrackingStore, TimeEntryModel } from './TimeTrackingStore'
import { TimerState } from './TimerState';

export class AppState {
  locationState: LocationState = new LocationState()
  timerState: TimerState = new TimerState(this)
  timeTrackingState: TimeTrackingStore = new TimeTrackingStore(this)

  constructor () {
  //   reaction(() => this.timerState.description.length, () => {
  //   this.timerState.setTimeEntry()
  //   console.log('XXXXX: ', this.timerState.timeEntry)}
  // )

  this.timeTrackingState.timeEntryAdd(new TimeEntryModel(aktiviti1))
  this.timeTrackingState.timeEntryAdd(new TimeEntryModel(aktiviti1))
  this.timeTrackingState.timeEntryAdd(new TimeEntryModel(aktiviti2))
  this.timeTrackingState.timeEntryAdd(new TimeEntryModel(aktiviti1))
  this.timeTrackingState.timeEntryAdd(new TimeEntryModel(aktiviti2))
  this.timeTrackingState.timeEntryAdd(aktiviti)
  }
}

export class LocationState {
  @observable currentPage: string = 'Projects'
  @observable pageList: string[] = [ 'NoviGod' ]

  addPage (page: string) {
    this.pageList = [ ...this.pageList, page ]
  }

  changePage (page: string) {
    this.currentPage = page
  }
}

const aktiviti = new TimeEntryModel({
  at: '2018-08-22T11:25:49+00:00',
  description: 'FxingNavBar',
  start: '22.11',
  stop: '3'
})
const aktiviti1 = {
  at: '2018-07-19T11:25:49+00:00',
  description: 'Zajko',
  start: '2018-08-24T22:36:19+02:00',
  stop: '2018-08-24T23:23:21+02:00'
}
const aktiviti2 = {
  at: '2018-08-24T22:36:19+02:00',
  description: 'Hemdoo',
  start: '2018-08-24T22:36:19+02:00',
  stop: '2018-08-24T23:23:21+02:00'
}
