import { observable } from 'mobx'
import { TimeTrackingState } from './TimeTrackingState'
import { TimerState } from './TimerState';

export class AppState {
  timeTrackingState: TimeTrackingState
  locationState: LocationState
  timerState: TimerState

  constructor () {
    this.timeTrackingState = new TimeTrackingState()
    this.locationState = new LocationState()
    this.timerState = new TimerState(this)
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
