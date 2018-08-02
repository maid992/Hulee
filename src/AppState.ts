import { observable, action, computed, reaction, autorun } from 'mobx'
import { TimeTrackingState } from './TimeTrackingState'

export class AppState {
  timeTrackingState = new TimeTrackingState()
  locationState = new LocationState()
  counterState = new CounterState()
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

export class CounterState {
  @observable time: number = 0
  @observable timer: NodeJS.Timer
  startTime
  endTime
  @observable working: boolean = true

  @action
  startCounter () {
    this.time++
  }

  @action
  resetCounter  () {
    return this.time = 0
  }
}
