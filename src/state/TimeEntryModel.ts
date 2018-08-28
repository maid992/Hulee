import { observable, action, computed } from 'mobx'
import * as moment from 'moment'
import { ID, TimeEntryProps } from './TimeTrackingStore'

export class TimeEntryModel {
  @observable at: string
  @observable billable: boolean = false
  @observable description: string
  @observable projectId: ID
  @observable start: string
  @observable stop: string

  private id: ID
  
  constructor (props?: TimeEntryProps) {
    for (const key in props) {
      (this as any)[key] = (props as any)[key]
    }
    this.id = ID()
  }

  @computed
  get getId () {
    return this.id
  }

  @action
  changeProject (pid: ID) {
    this.projectId = pid
  }

  @computed
  get date (): string {
    const date = moment(this.at).format('D MMMM YYYY').toString()
    return date
  }
  
  @computed
  get duration (): string {
    const start = moment.utc(this.start)
    const stop = moment.utc(this.stop)
    const v = moment
      .utc(moment.duration(stop.diff(start), 'milliseconds').asMilliseconds())
      .format('H:mm:ss')
    return v
  }
}
