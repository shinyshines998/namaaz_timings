// Import the JSON data directly - no filesystem operations
import prayerTimesData from './prayer-times.json';

export interface PrayerTime {
  name: string;
  time: string;
}

export interface DailyPrayerTimes {
  date: Date;
  times: PrayerTime[];
}

interface PrayerTimeEntry {
  month: number;
  day: number;
  fajr: { hours: number; minutes: number };
  sunrise: { hours: number; minutes: number };
  zawal: { hours: number; minutes: number };
  dhuhr: { hours: number; minutes: number };
  asr: { hours: number; minutes: number };
  maghrib: { hours: number; minutes: number };
  isha: { hours: number; minutes: number };
}

function formatTime(hours: number, minutes: number): string {
  const period = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes.toString().padStart(2, "0");
  return `${formattedHours}:${formattedMinutes} ${period}`;
}

function getPrayerTimesFromJSON(month: number, day: number): PrayerTime[] {
  // Find the prayer times for the given month and day
  const entry = prayerTimesData.prayerTimes.find(
    (item: PrayerTimeEntry) => item.month === month && item.day === day
  );

  if (!entry) {
    // Return default times if no data found
    console.warn(`No prayer times found for date: ${month}/${day}`);
    return getDefaultPrayerTimes();
  }

  return [
    {
      name: "FAJR",
      time: formatTime(entry.fajr.hours, entry.fajr.minutes),
    },
    {
      name: "SUNRISE",
      time: formatTime(entry.sunrise.hours, entry.sunrise.minutes),
    },
    {
      name: "ZAWAL",
      time: formatTime(entry.zawal.hours, entry.zawal.minutes),
    },
    {
      name: "DHUHR",
      time: formatTime(entry.dhuhr.hours, entry.dhuhr.minutes),
    },
    {
      name: "ASR",
      time: formatTime(entry.asr.hours, entry.asr.minutes),
    },
    {
      name: "MAGHRIB",
      time: formatTime(entry.maghrib.hours, entry.maghrib.minutes),
    },
    {
      name: "ISHA",
      time: formatTime(entry.isha.hours, entry.isha.minutes),
    },
  ];
}

function getDefaultPrayerTimes(): PrayerTime[] {
  // Default prayer times as fallback
  return [
    { name: "FAJR", time: "5:30 AM" },
    { name: "SUNRISE", time: "7:00 AM" },
    { name: "ZAWAL", time: "12:15 PM" },
    { name: "DHUHR", time: "12:30 PM" },
    { name: "ASR", time: "3:30 PM" },
    { name: "MAGHRIB", time: "6:00 PM" },
    { name: "ISHA", time: "7:30 PM" },
  ];
}

export function getPrayerTimes(date: Date): PrayerTime[] {
  return getPrayerTimesFromJSON(date.getMonth() + 1, date.getDate());
}

export function getWeeklyPrayerTimes(date: Date): DailyPrayerTimes[] {
  const weeklyTimes: DailyPrayerTimes[] = [];
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + i);
    weeklyTimes.push({
      date: currentDate,
      times: getPrayerTimes(currentDate),
    });
  }
  return weeklyTimes;
}

export function getMonthlyPrayerTimes(date: Date): DailyPrayerTimes[] {
  const monthlyTimes: DailyPrayerTimes[] = [];
  const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

  for (let i = 1; i <= daysInMonth; i++) {
    const currentDate = new Date(date.getFullYear(), date.getMonth(), i);
    monthlyTimes.push({
      date: currentDate,
      times: getPrayerTimes(currentDate),
    });
  }
  return monthlyTimes;
}

export function getYearlyPrayerTimes(year: number): DailyPrayerTimes[] {
  const yearlyTimes: DailyPrayerTimes[] = [];

  for (let month = 0; month < 12; month++) {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(year, month, day);
      yearlyTimes.push({
        date: currentDate,
        times: getPrayerTimes(currentDate),
      });
    }
  }
  return yearlyTimes;
}

// Helper function to get the next prayer time
export function getNextPrayer(currentTime: Date = new Date()): { name: string; time: string; remainingTime: string } | null {
  const todayPrayers = getPrayerTimes(currentTime);
  const currentHours = currentTime.getHours();
  const currentMinutes = currentTime.getMinutes();
  const currentTotalMinutes = currentHours * 60 + currentMinutes;

  for (const prayer of todayPrayers) {
    // Parse prayer time
    const [time, period] = prayer.time.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    let prayerHours = hours;

    if (period === 'PM' && hours !== 12) {
      prayerHours += 12;
    } else if (period === 'AM' && hours === 12) {
      prayerHours = 0;
    }

    const prayerTotalMinutes = prayerHours * 60 + minutes;

    if (prayerTotalMinutes > currentTotalMinutes) {
      const remainingMinutes = prayerTotalMinutes - currentTotalMinutes;
      const remainingHours = Math.floor(remainingMinutes / 60);
      const remainingMins = remainingMinutes % 60;

      return {
        name: prayer.name,
        time: prayer.time,
        remainingTime: `${remainingHours}h ${remainingMins}m`
      };
    }
  }

  // If no prayer left today, return tomorrow's Fajr
  const tomorrow = new Date(currentTime);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowPrayers = getPrayerTimes(tomorrow);

  if (tomorrowPrayers.length > 0) {
    return {
      name: tomorrowPrayers[0].name,
      time: `${tomorrowPrayers[0].time} (tomorrow)`,
      remainingTime: 'Tomorrow'
    };
  }

  return null;
}
