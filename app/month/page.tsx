import Header from "../components/Header"
import PrayerTable from "../components/PrayerTable"
import { getMonthlyPrayerTimes } from "../utils/timeUtils"
import { format } from "date-fns"

export default function MonthPage() {
  const today = new Date()
  const monthlyPrayerTimes = getMonthlyPrayerTimes(today)

  return (
    <div className="min-h-screen islamic-bg">
      <div className="min-h-screen bg-teal/50 flex flex-col">
        <Header />
        <main className="container mx-auto px-4 py-24 flex-grow">
          <PrayerTable prayerTimes={monthlyPrayerTimes} title={`${format(today, "MMMM yyyy")}`} />
        </main>
        <footer className="w-full text-center py-4 bg-teal/75 backdrop-blur-sm">
          <p className="text-lg text-cream/90 tracking-wider mb-2 font-cormorant">MEERUT, UTTAR PRADESH, INDIA</p>
          <p className="text-sm mb-2 text-cream/70 font-cormorant">Method: Islamic Society of India</p>
          <p className="text-sm text-cream/70 font-cormorant">
            COPYRIGHT © {new Date().getFullYear()} PRAYER TIMES. ALL RIGHTS RESERVED.
          </p>
        </footer>
      </div>
    </div>
  )
}
