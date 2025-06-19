"use client"

import { useState, useEffect } from "react"
import YearlyPrayerTable from "../components/YearlyPrayerTable"
import { DailyPrayerTimes } from "../utils/timeUtils"

export default function YearPage() {
  const [prayerTimes, setPrayerTimes] = useState<DailyPrayerTimes[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const currentYear = new Date().getFullYear()

  useEffect(() => {
    const fetchYearlyPrayerTimes = async () => {
      try {
        const response = await fetch(`/api/prayer-times?type=yearly&year=${currentYear}`)
        if (!response.ok) {
          throw new Error('Failed to fetch yearly prayer times')
        }
        const data = await response.json()

        // Convert ISO strings back to Date objects
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const convertedData = data.prayerTimes.map((item: any) => ({
          date: new Date(item.date),
          times: item.times
        }))

        setPrayerTimes(convertedData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchYearlyPrayerTimes()
  }, [currentYear])

  if (loading) {
    return (
      <main className="container mx-auto px-4 py-24 flex-grow">
        <div className="prayer-container rounded-2xl p-6 text-center">
          <p className="text-xl golden-text">Loading yearly prayer times...</p>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="container mx-auto px-4 py-24 flex-grow">
        <div className="prayer-container rounded-2xl p-6 text-center">
          <p className="text-xl golden-text">Error: {error}</p>
        </div>
      </main>
    )
  }

  return (
    <main className="container mx-auto px-4 py-24 flex-grow">
      <YearlyPrayerTable prayerTimes={prayerTimes} title="Yearly Prayer Times" />
    </main>
  )
}
