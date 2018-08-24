import { observable, when, autorun, reaction } from 'mobx'
import { TimeTrackingStore } from './TimeTrackingStore'
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
