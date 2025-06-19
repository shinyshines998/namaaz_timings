"use client"

import { useState, useEffect } from "react"
import { getFormattedIslamicDate } from "../utils/islamicDateUtils"
import { PrayerTime } from "../utils/timeUtils"

const PrayerCard = () => {
  const [times, setTimes] = useState<PrayerTime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const today = new Date();

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const response = await fetch(`/api/prayer-times?month=${today.getMonth() + 1}&day=${today.getDate()}`);
        if (!response.ok) {
          throw new Error('Failed to fetch prayer times');
        }
        const data = await response.json();
        setTimes(data.times);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPrayerTimes();
  }, [today]);

  if (loading) {
    return (
      <div className="max-w-md mx-auto w-full">
        <div className="prayer-container rounded-2xl p-8 md:p-12 text-center">
          <p className="text-xl golden-text">Loading prayer times...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto w-full">
        <div className="prayer-container rounded-2xl p-8 md:p-12 text-center">
          <p className="text-xl golden-text">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto w-full">
      <div className="prayer-container rounded-2xl p-8 md:p-12">
        <h1 className="text-4xl md:text-5xl font-cormorant font-semibold text-center golden-text mb-4">
          Islamic Prayer Timings
        </h1>
        <p className="text-xl font-cormorant font-semibold text-center golden-text mb-4">Today&apos;s Date: {today.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
        <p className="text-xl font-cormorant font-semibold text-center golden-text mb-4">Islamic Date: {getFormattedIslamicDate(today)}</p>
        <div className="space-y-4 mb-0">
          {times.map((prayer) => (
            <div key={prayer.name} className="flex justify-between items-center">
              <div className="text-xl tracking-wider font-cormorant golden-text font-bold">{prayer.name}</div>
              <div className="prayer-time text-2xl golden-text">{prayer.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PrayerCard
