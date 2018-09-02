// const timeEntries = this.getAllTimeEntries.reduce((r, v, i, a, k = v.date) => {
//   (r[k] || (r[k] = [])).push(v)
//   return r
// }, [])

// return Object.values(timeEntries)

export const groupBy = <T>(list: T[], prop: string): T[][] => {
  return Object.values(
    list.reduce((groups: T[][], item: T) => {
      const val: number = (item as any)[prop]
      groups[val] = groups[val] || []
      groups[val].push(item)
      return groups
    }, [])
  )
}
