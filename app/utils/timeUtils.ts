export interface PrayerTime {
  name: string
  time: string
}

export interface DailyPrayerTimes {
  date: Date
  times: PrayerTime[]
}
