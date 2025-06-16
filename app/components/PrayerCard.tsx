interface PrayerTime {
  name: string
  time: string
}

interface PrayerCardProps {
  today: Date
  times: PrayerTime[]
}

const PrayerCard = ({ today, times }: PrayerCardProps) => {
  return (
    <div className="max-w-md mx-auto w-full">
      <div className="prayer-container rounded-2xl p-8 md:p-12">
        <h1 className="text-4xl md:text-5xl font-cormorant font-semibold text-center golden-text mb-4">
          Islamic Prayer Timings
        </h1>
        <p className="text-xl font-cormorant font-semibold text-center golden-text mb-4">Today's Date -- {today.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
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

