import { observable, action, computed, runInAction } from 'mobx'
import * as moment from 'moment'
import { AppState } from './AppState'
import { TimeEntryProps } from './TimeTrackingStore'
import { TimeEntryModel } from "./TimeEntryModel"

export class TimerStore {
  @observable timer: Timer
  @observable startTime: string
  @observable endTime: string
  @observable isRunning: boolean = false

  @observable description: string
  @observable project: number
  @observable billable: boolean
  @observable tag: string

  private appState: AppState

  /**
   * autocomplete
   * changeDescription
   * changeBillable
   * changeProjectTask
   * changeStart
   * changeStop
   * changeStartStop
   * changeTags
   * changeWorkspace
   * continueTimeEntry
   * continueExistingTimeEntry
   * discard
   * manualyAddTimeEntry
   * reset
   * saveTimeEntry
   * setTimeEntry
   * 
   * submitDescription
   * submitStart
   * submitStop
   */

  @computed
  get timeEntry (): TimeEntryModel {
    const data: TimeEntryProps = {
      at: this.startTime,
      description: this.description,
      projectId: this.project,
      start: this.startTime,
      stop: this.endTime
    }

    return new TimeEntryModel(data)
  }

  @action
  changeDescription (description?: string) {
    this.description = description ? description : ''
  }

  @action
  changeProject (id: number) {
    this.project = id
  }

  constructor (store: AppState) {
    this.appState = store
    runInAction(() => {
      this.isRunning = false
      this.timer = new Timer()
    })

    // this.changeDescription()
  }

  @action
  measure () {
    if (!this.isRunning) {
      return
    }
    this.timer.milliSeconds = moment().diff(this.startTime)
    setTimeout(() => this.measure(), 10)
  }

  @action
  startTimeEntry () {
    if (this.isRunning) {
      return
    }
    this.isRunning = true
    this.startTime = moment().format()
    this.measure()
  }

  @action
  stopTimeEntry () {
    if (this.isRunning === true) {
      this.timer.saveTime()
      this.endTime = moment().format()
      this.isRunning = false
      // Save TimeEntry on Stop
      this.appState.timeTrackingStore.timeEntryAdd(this.timeEntry)
      // Clear timeEntry Input
      // this.changeDescription()
    }
    return
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

  @computed
  get totalMilliSeconds () {
    return this.milliSeconds + this.savedMilliSeconds
  }

  @computed
  get display () {
    const v = moment
      .utc(moment.duration(this.milliSeconds, 'milliseconds').asMilliseconds())
      .format('H:mm:ss')
    return v
  }
}
