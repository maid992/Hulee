import { observable } from 'mobx'
import { TimeTrackingStore } from './TimeTrackingStore'
import { TimeEntryModel } from "./TimeEntryModel";
import { TimerStore } from './TimerState';

export class AppState {
  locationState: LocationState = new LocationState()
  timerStore: TimerStore = new TimerStore(this)
  timeTrackingStore: TimeTrackingStore = new TimeTrackingStore(this)

  constructor () {
  //   reaction(() => this.timerState.description.length, () => {
  //   this.timerState.setTimeEntry()
  //   console.log('XXXXX: ', this.timerState.timeEntry)}
  // )

  this.timeTrackingStore.projectAdd('WorkManagmentSite', 33, 'EUR')

  this.timeTrackingStore.timeEntryAdd(new TimeEntryModel(aktiviti1))
  this.timeTrackingStore.timeEntryAdd(new TimeEntryModel(aktiviti1))
  this.timeTrackingStore.timeEntryAdd(new TimeEntryModel(aktiviti2))
  this.timeTrackingStore.timeEntryAdd(new TimeEntryModel(aktiviti1))
  this.timeTrackingStore.timeEntryAdd(new TimeEntryModel(aktiviti2))
  this.timeTrackingStore.timeEntryAdd(aktiviti)
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
  start: '2018-08-24T22:36:19+02:00',
  stop: '2018-08-24T23:23:21+02:00'
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
