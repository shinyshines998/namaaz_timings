import { readFileSync } from "fs"
import { join } from "path"
import { parse } from "csv-parse/sync"

interface RawPrayerTime {
  Month: string
  Day: string
  "Fajr hrs": string
  "Fajr mins": string
  "Sunrise hrs": string
  "Sunrise mins": string
  "Zawal hrs": string
  "Zawal mins": string
  "Dhuhr hrs": string
  "Dhuhr mins": string
  "Asr hrs": string
  "Asr mins": string
  "Maghrib hrs": string
  "Maghrib mins": string
  "Isha hrs": string
  "Isha mins": string
}

export interface PrayerTime {
  name: string
  time: string
}

export interface DailyPrayerTimes {
  date: Date
  times: PrayerTime[]
}

function formatTime(hours: number, minutes: number): string {
  const period = hours >= 12 ? "PM" : "AM"
  const formattedHours = hours % 12 || 12
  const formattedMinutes = minutes.toString().padStart(2, "0")
  return `${formattedHours}:${formattedMinutes} ${period}`
}

function getPrayerTimesFromCSV(month: number, day: number): PrayerTime[] {
  const csvPath = join(process.cwd(), "app", "utils", "prayer-times.csv")
  const fileContent = readFileSync(csvPath, "utf-8")
  const records: RawPrayerTime[] = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
  })

  const record = records.find((r) => Number.parseInt(r.Month) === month && Number.parseInt(r.Day) === day)

  if (!record) {
    throw new Error(`No prayer times found for date: ${month}/${day}`)
  }

  return [
    {
      name: "FAJR",
      time: formatTime(Number.parseInt(record["Fajr hrs"]), Number.parseInt(record["Fajr mins"])),
    },
    {
      name: "SUNRISE",
      time: formatTime(Number.parseInt(record["Sunrise hrs"]), Number.parseInt(record["Sunrise mins"])),
    },
    {
      name: "ZAWAL",
      time: formatTime(Number.parseInt(record["Zawal hrs"]), Number.parseInt(record["Zawal mins"])),
    },
    {
      name: "DHUHR",
      time: formatTime(Number.parseInt(record["Dhuhr hrs"]), Number.parseInt(record["Dhuhr mins"])),
    },
    {
      name: "ASR",
      time: formatTime(Number.parseInt(record["Asr hrs"]), Number.parseInt(record["Asr mins"])),
    },
    {
      name: "MAGHRIB",
      time: formatTime(Number.parseInt(record["Maghrib hrs"]), Number.parseInt(record["Maghrib mins"])),
    },
    {
      name: "ISHA",
      time: formatTime(Number.parseInt(record["Isha hrs"]), Number.parseInt(record["Isha mins"])),
    },
  ]
}

export function getPrayerTimes(date: Date): PrayerTime[] {
  return getPrayerTimesFromCSV(date.getMonth() + 1, date.getDate())
}

export function getWeeklyPrayerTimes(date: Date): DailyPrayerTimes[] {
  const weeklyTimes: DailyPrayerTimes[] = []
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + i)
    weeklyTimes.push({
      date: currentDate,
      times: getPrayerTimes(currentDate),
    })
  }
  return weeklyTimes
}

export function getMonthlyPrayerTimes(date: Date): DailyPrayerTimes[] {
  const monthlyTimes: DailyPrayerTimes[] = []
  const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  for (let i = 1; i <= daysInMonth; i++) {
    const currentDate = new Date(date.getFullYear(), date.getMonth(), i)
    monthlyTimes.push({
      date: currentDate,
      times: getPrayerTimes(currentDate),
    })
  }
  return monthlyTimes
}

export function getYearlyPrayerTimes(year: number): DailyPrayerTimes[] {
  const yearlyTimes: DailyPrayerTimes[] = []
  for (let month = 0; month < 12; month++) {
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(year, month, day)
      yearlyTimes.push({
        date: currentDate,
        times: getPrayerTimes(currentDate),
      })
    }
  }
  return yearlyTimes
}
