"use client"

import { format } from "date-fns"
import { useState } from "react"
import type { DailyPrayerTimes } from "../utils/timeUtils"

interface PrayerTableProps {
  prayerTimes: DailyPrayerTimes[]
  title: string
  showMonthHeaders?: boolean
}

const PrayerTable = ({ prayerTimes, title, showMonthHeaders = false }: PrayerTableProps) => {
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()
  const [isAllExpanded, setIsAllExpanded] = useState(false)

  // Initialize expanded months - only current month is expanded by default
  const [expandedMonths, setExpandedMonths] = useState<Set<string>>(() => {
    const initial = new Set<string>()
    initial.add(`${currentYear}-${currentMonth}`)
    return initial
  })

  const toggleMonth = (year: number, month: number) => {
    const key = `${year}-${month}`
    const newExpanded = new Set(expandedMonths)
    if (newExpanded.has(key)) {
      newExpanded.delete(key)
    } else {
      newExpanded.add(key)
    }
    setExpandedMonths(newExpanded)
  }

  const toggleAllMonths = () => {
    if (isAllExpanded) {
      // Collapse all
      setExpandedMonths(new Set([`${currentYear}-${currentMonth}`])) // Keep only current month expanded
    } else {
      // Expand all
      const allMonthKeys = Object.keys(groupedByMonth!)
      setExpandedMonths(new Set(allMonthKeys))
    }
    setIsAllExpanded(!isAllExpanded)
  }
  const TableHeader = () => (
    <tr className="bg-gold/20 backdrop-blur-sm border-y border-gold/30">
      <th className="py-4 px-4 text-left font-semibold text-gold uppercase text-sm tracking-wider">Date</th>
      <th className="py-4 text-center font-semibold text-gold uppercase text-sm tracking-wider">Fajr</th>
      <th className="py-4 text-center font-semibold text-gold uppercase text-sm tracking-wider">Sunrise</th>
      <th className="py-4 text-center font-semibold text-gold uppercase text-sm tracking-wider">Zawal</th>
      <th className="py-4 text-center font-semibold text-gold uppercase text-sm tracking-wider">Dhuhr</th>
      <th className="py-4 text-center font-semibold text-gold uppercase text-sm tracking-wider">Asr</th>
      <th className="py-4 text-center font-semibold text-gold uppercase text-sm tracking-wider">Maghrib</th>
      <th className="py-4 text-center font-semibold text-gold uppercase text-sm tracking-wider">Isha</th>
    </tr>
  )

  // Group prayer times by month if showing month headers
  const groupedByMonth = showMonthHeaders ? prayerTimes.reduce((acc, day) => {
    const monthKey = `${day.date.getFullYear()}-${day.date.getMonth()}`
    if (!acc[monthKey]) {
      acc[monthKey] = []
    }
    acc[monthKey].push(day)
    return acc
  }, {} as Record<string, DailyPrayerTimes[]>) : null

  if (!showMonthHeaders) {
    // Original rendering for non-year views
    return (
      <div className="prayer-container rounded-2xl p-6 overflow-x-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-playfair golden-text text-center">{title}</h2>
        </div>
        <table className="w-full min-w-[800px]">
          <thead>
            <TableHeader />
          </thead>
          <tbody>
            {prayerTimes.map((day, index) => {
              const isToday = format(day.date, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd")
              return (
                <tr
                  key={day.date.toISOString()}
                  className={`
                    ${isToday ? "text-gold font-medium" : "text-white/90"} 
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
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }

  // Rendering for year view with collapsible months
  return (
    <div className="prayer-container rounded-2xl p-6 overflow-x-auto">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-playfair golden-text">{title}</h2>
          {showMonthHeaders && (
            <button
              onClick={toggleAllMonths}
              className="px-4 py-2 bg-gold/20 hover:bg-gold/30 text-gold border border-gold/40 rounded-lg transition-colors font-cormorant uppercase tracking-wider text-sm"
            >
              {isAllExpanded ? 'Collapse All' : 'Expand All'}
            </button>
          )}
        </div>
      </div>     <div className="space-y-4">
        {Object.entries(groupedByMonth!).map(([monthKey, days]) => {
          const [yearStr, monthStr] = monthKey.split('-')
          const year = parseInt(yearStr)
          const month = parseInt(monthStr)
          const isExpanded = expandedMonths.has(monthKey)

          return (
            <div key={monthKey} className="border border-gold/20 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleMonth(year, month)}
                className="w-full px-6 py-4 bg-black/30 hover:bg-black/40 transition-colors flex items-center justify-between group"
              >
                <h3 className="text-xl font-playfair text-gold text-left relative">
                  {format(days[0].date, "MMMM yyyy")}
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-gold to-transparent"></span>
                </h3>
                <span className="text-gold/60 group-hover:text-gold transition-colors">
                  {isExpanded ? '−' : '+'}
                </span>
              </button>

              {isExpanded && (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[800px]">
                    <thead>
                      <TableHeader />
                    </thead>
                    <tbody>
                      {days.map((day, index) => {
                        const isToday = format(day.date, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd")
                        return (
                          <tr
                            key={day.date.toISOString()}
                            className={`
                              ${isToday ? "text-gold font-medium" : "text-white/90"} 
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
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PrayerTable
