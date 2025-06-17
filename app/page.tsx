import Header from "./components/Header";
import PrayerCard from "./components/PrayerCard";
import { getPrayerTimes } from "./utils/timeUtils";

export default function Home() {
  const today = new Date();
  const prayerTimes = getPrayerTimes(today);

  return (
    <div className="min-h-screen islamic-bg">
      <div className="min-h-screen bg-teal/50 flex flex-col">
        <Header />
        <main className="container mx-auto px-4 pt-12 pb-4 flex-grow flex items-center justify-center">
          <PrayerCard today={today} times={prayerTimes} />
        </main>
        <footer className="w-full text-center py-0 bg-teal/75">
          <p className="text-lg text-cream/90 tracking-wider mb-0 font-cormorant">
            MEERUT, UTTAR PRADESH, INDIA
          </p>
          <p className="text-lg text-cream/80 tracking-wider mb-0 font-cormorant">
            Today's Date is {today.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}
          </p>
          <p className="text-sm mb-0 text-cream/70 font-cormorant">
            Method: Islamic Society of India
          </p>
          <p className="text-sm text-cream/70 font-cormorant">
            COPYRIGHT © {today.getFullYear()} PRAYER TIMES. ALL RIGHTS RESERVED.
          </p>
        </footer>
      </div>
    </div>
  );
}
