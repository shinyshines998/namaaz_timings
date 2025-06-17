// app/utils/prayer-times.json.d.ts
declare module './prayer-times.json' {
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

  interface PrayerTimesData {
    prayerTimes: PrayerTimeEntry[];
    metadata: {
      location: string;
      method: string;
      totalEntries: number;
    };
  }

  const data: PrayerTimesData;
  export default data;
}
