import { NextRequest, NextResponse } from 'next/server';
import { readFileSync } from "fs";
import { join } from "path";
import { parse } from "csv-parse/sync";

interface RawPrayerTime {
  Month: string;
  Day: string;
  "Fajr hrs": string;
  "Fajr mins": string;
  "Sunrise hrs": string;
  "Sunrise mins": string;
  "Zawal hrs": string;
  "Zawal mins": string;
  "Dhuhr hrs": string;
  "Dhuhr mins": string;
  "Asr hrs": string;
  "Asr mins": string;
  "Maghrib hrs": string;
  "Maghrib mins": string;
  "Isha hrs": string;
  "Isha mins": string;
}

function formatTime(hours: number, minutes: number): string {
  const period = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes.toString().padStart(2, "0");
  return `${formattedHours}:${formattedMinutes} ${period}`;
}

function getPrayerTimesForDay(record: RawPrayerTime) {
  return [
    {
      name: "FAJR",
      time: formatTime(parseInt(record["Fajr hrs"]), parseInt(record["Fajr mins"])),
    },
    {
      name: "SUNRISE",
      time: formatTime(parseInt(record["Sunrise hrs"]), parseInt(record["Sunrise mins"])),
    },
    {
      name: "ZAWAL",
      time: formatTime(parseInt(record["Zawal hrs"]), parseInt(record["Zawal mins"])),
    },
    {
      name: "DHUHR",
      time: formatTime(parseInt(record["Dhuhr hrs"]), parseInt(record["Dhuhr mins"])),
    },
    {
      name: "ASR",
      time: formatTime(parseInt(record["Asr hrs"]), parseInt(record["Asr mins"])),
    },
    {
      name: "MAGHRIB",
      time: formatTime(parseInt(record["Maghrib hrs"]), parseInt(record["Maghrib mins"])),
    },
    {
      name: "ISHA",
      time: formatTime(parseInt(record["Isha hrs"]), parseInt(record["Isha mins"])),
    },
  ];
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get('type') || 'daily';
  const month = parseInt(searchParams.get('month') || '0');
  const day = parseInt(searchParams.get('day') || '0');
  const year = parseInt(searchParams.get('year') || new Date().getFullYear().toString());

  try {
    const csvPath = join(process.cwd(), "app", "utils", "prayer-times.csv");
    const fileContent = readFileSync(csvPath, "utf-8");
    const records: RawPrayerTime[] = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
    });

    // Handle daily request
    if (type === 'daily') {
      if (!month || !day) {
        return NextResponse.json({ error: 'Month and day are required for daily request' }, { status: 400 });
      }

      const record = records.find((r) => parseInt(r.Month) === month && parseInt(r.Day) === day);
      if (!record) {
        return NextResponse.json({ error: `No prayer times found for date: ${month}/${day}` }, { status: 404 });
      }

      return NextResponse.json({ times: getPrayerTimesForDay(record) });
    }

    // Handle yearly request
    if (type === 'yearly') {
      const yearlyData = [];

      for (let month = 1; month <= 12; month++) {
        const daysInMonth = new Date(year, month, 0).getDate();

        for (let day = 1; day <= daysInMonth; day++) {
          const record = records.find((r) => parseInt(r.Month) === month && parseInt(r.Day) === day);
          if (record) {
            yearlyData.push({
              date: new Date(year, month - 1, day).toISOString(),
              times: getPrayerTimesForDay(record)
            });
          }
        }
      }

      return NextResponse.json({ prayerTimes: yearlyData });
    }

    return NextResponse.json({ error: 'Invalid request type' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: `Failed to read prayer times, ${error}` }, { status: 500 });
  }
}
