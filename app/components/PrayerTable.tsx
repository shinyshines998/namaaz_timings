import { format } from "date-fns"
import type { DailyPrayerTimes } from "../utils/timeUtils"

interface PrayerTableProps {
  prayerTimes: DailyPrayerTimes[]
  title: string
  showMonthHeaders?: boolean
}

const PrayerTable = ({ prayerTimes, title, showMonthHeaders = false }: PrayerTableProps) => {
  let currentMonth = -1

  const TableHeader = () => (
    <tr className="text-white/90 border-b border-white/10">
      <th className="py-3 text-left font-normal">Date</th>
      <th className="py-3 text-center font-normal">Fajr</th>
      <th className="py-3 text-center font-normal">Sunrise</th>
      <th className="py-3 text-center font-normal">Zawal</th>
      <th className="py-3 text-center font-normal">Dhuhr</th>
      <th className="py-3 text-center font-normal">Asr</th>
      <th className="py-3 text-center font-normal">Maghrib</th>
      <th className="py-3 text-center font-normal">Isha</th>
    </tr>
  )

  return (
    <div className="prayer-container rounded-2xl p-6 overflow-x-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-playfair golden-text text-center">{title}</h2>
      </div>
      <table className="w-full min-w-[800px]">
        {!showMonthHeaders && (
          <thead>
            <TableHeader />
          </thead>
        )}
        <tbody>
          {prayerTimes.map((day, index) => {
            const isToday = format(day.date, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd")
            const isFirstDayOfMonth = day.date.getDate() === 1 && day.date.getMonth() !== currentMonth
            const monthHeader =
              showMonthHeaders && isFirstDayOfMonth ? (
                <>
                  <tr key={`month-${day.date.getMonth()}`}>
                    <td colSpan={8} className="py-4 text-center font-playfair text-xl golden-text">
                      {format(day.date, "MMMM yyyy")}
                    </td>
                  </tr>
                  <TableHeader />
                </>
              ) : null
            currentMonth = day.date.getMonth()
            return (
              <>
                {monthHeader}
                <tr
                  key={day.date.toISOString()}
                  className={`
                    ${isToday ? "text-gold" : "text-white/90"} 
                    ${index % 2 === 0 ? "bg-black/20" : "bg-transparent"}
                    hover:bg-white/5 transition-colors
                  `}
                >
                  <td className="py-3 pl-4">{format(day.date, "MMM d")}</td>
                  {["FAJR", "SUNRISE", "ZAWAL", "DHUHR", "ASR", "MAGHRIB", "ISHA"].map((prayerName) => {
                    const prayer = day.times.find((t) => t.name === prayerName)
                    return (
                      <td key={prayerName} className="py-3 text-center font-playfair">
                        {prayer?.time}
                      </td>
                    )
                  })}
                </tr>
              </>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default PrayerTable

