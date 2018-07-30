import { observable, action } from 'mobx'

export class AppState {
  @observable count: number = 333
  @observable currentPage: string[] = ['NoviGod']
  
  @action
  updateCount (count: number) {
    this.count = count
  }

  @action
  changePage (page: string) {
    this.currentPage = [
      ...this.currentPage,
      page
    ]

  }

}
