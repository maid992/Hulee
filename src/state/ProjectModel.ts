import { observable } from 'mobx'
import { ID } from './TimeTrackingStore'

export class ProjectModel {
  @observable active: boolean
  @observable actualHours: number
  @observable at: string
  @observable color: string = '#a01aa5'
  @observable createdAt: string
  @observable currency: string
  @observable id: ID = ID()
  @observable name: string
  @observable rate: number

  constructor (name: string, rate: number, currency: string) {
    this.id = ID()
    this.name = name
    this.rate = rate
    this.currency = currency
  }
  
}
