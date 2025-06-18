import moment from 'moment-hijri'

export interface IslamicDate {
  day: number
  month: number
  year: number
  monthName: string
  dayName: string
  formatted: string
}

const islamicMonths = [
  'Muharram', 'Safar', 'Rabi\' al-awwal', 'Rabi\' al-thani',
  'Jumada al-awwal', 'Jumada al-thani', 'Rajab', 'Sha\'ban',
  'Ramadan', 'Shawwal', 'Dhu al-Qi\'dah', 'Dhu al-Hijjah'
]

const islamicDays = [
  'Ahad', 'Ithnayn', 'Thulatha', 'Arba\'a',
  'Khamis', 'Jum\'ah', 'Sabt'
]

export function getIslamicDate(gregorianDate?: Date): IslamicDate {
  const date = gregorianDate || new Date()
  const hijriMoment = moment(date).locale('en')

  // Convert to Hijri
  const hijriDate = hijriMoment.format('iYYYY/iM/iD')
  const [year, month, day] = hijriDate.split('/').map(Number)

  // Get day of week
  const dayOfWeek = date.getDay() // 0 = Sunday, 1 = Monday, etc.

  return {
    day,
    month,
    year,
    monthName: islamicMonths[month - 1],
    dayName: islamicDays[dayOfWeek],
    formatted: `${day} ${islamicMonths[month - 1]} ${year} AH`
  }
}

export function getFormattedIslamicDate(gregorianDate?: Date): string {
  const islamicDate = getIslamicDate(gregorianDate)
  return `${islamicDate.dayName}, ${islamicDate.formatted}`
}
