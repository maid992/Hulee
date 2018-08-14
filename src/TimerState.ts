import { observable, action, computed, runInAction } from 'mobx'
import * as moment from 'moment'
import {AppState} from './AppState'

export class TimerState {
  @observable timer: Timer
  @observable startTime: moment.Moment
  @observable endTime: moment.Moment
  @observable isRunning: boolean = false
  appState: AppState

  constructor (store: AppState) {
    runInAction(() => {
      this.isRunning = false
      this.timer = new Timer()
      this.appState = store
    })
  }

  @computed
  get getStartTime () {
    return this.startTime ? this.startTime.format('DD/MM/YY HH:mm:ss') : '----'
  }

  @computed
  get getEndTime () {
    return this.endTime ? this.endTime.format('DD/MM/YY HH:mm:ss') : '----'
  }

  @action
  measure () {
    if (!this.isRunning) {
      return
    }
    this.timer.milliSeconds = moment().diff(this.startTime)
    setTimeout(() => this.measure(), 10);
  }

  @action
  startTimer () {
    if (this.isRunning) {return}
    this.isRunning = true
    this.startTime = moment()
    this.measure()
  }

  @action
  setTime (when?: string) {
    const date = moment()
    return when ? (this.startTime = date) : (this.endTime = date)
  }

  @action
  stopTimer () {
    this.timer.saveTime()
    this.endTime = moment()
    this.isRunning = false
    const { getCurrentProject, getCurrentActivity } = this.appState.timeTrackingState
    this.appState.timeTrackingState.addActivity(getCurrentProject, this.getEndTime, getCurrentActivity)
  }

  @action
  reset () {
    return (this.timer.milliSeconds = this.timer.savedMilliSeconds = 0)
  }

  @computed
  get hasStarted () {
    return this.timer.totalSeconds !== 0
  }
}

class Timer {
  @observable milliSeconds: number
  @observable savedMilliSeconds: number

  constructor (initialSeconds: number = 0) {
    runInAction(() => {
      this.milliSeconds = initialSeconds
      this.savedMilliSeconds = 0
    })
  }

  @action
  saveTime () {
    this.savedMilliSeconds += this.milliSeconds
    this.milliSeconds = 0
  }

  @action
  reset () {
    this.milliSeconds = this.savedMilliSeconds = 0
  }

  @computed
  get totalSeconds () {
    return this.milliSeconds + this.savedMilliSeconds
  }
  
}
