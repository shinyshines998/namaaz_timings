import type React from "react"
import { format } from "date-fns"

interface PrayerTime {
  name: string
  time: string
}

interface PrayerTimesProps {
  date: Date
  times: PrayerTime[]
}

const PrayerTimes: React.FC<PrayerTimesProps> = ({ date, times }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">{format(date, "MMMM d, yyyy")}</h2>
      <div className="grid grid-cols-2 gap-4">
        {times.map((prayer) => (
          <div key={prayer.name} className="flex justify-between items-center">
            <span className="font-semibold">{prayer.name}</span>
            <span>{prayer.time}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PrayerTimes

