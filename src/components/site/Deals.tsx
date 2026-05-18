import { useEffect, useState } from "react";
import { PartyPopper, CalendarHeart, Building2 } from "lucide-react";

const deals = [
  {
    icon: PartyPopper,
    title: "First Ride",
    desc: "15% off for new users",
    code: "MANASVI5",
  },
  {
    icon: CalendarHeart,
    title: "Weekend Special",
    desc: "Flat ₹200 off on 2+ day bookings",
    code: "WEEKEND200",
  },
  {
    icon: Building2,
    title: "Corporate Plan",
    desc: "Monthly packages for businesses",
    code: "CORPORATE",
  },
];

function useCountdown(seconds: number) {
  const [t, setT] = useState(seconds);
  useEffect(() => {
    const id = setInterval(() => setT((v) => (v > 0 ? v - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);
  const h = String(Math.floor(t / 3600)).padStart(2, "0");
  const m = String(Math.floor((t % 3600) / 60)).padStart(2, "0");
  const s = String(t % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

export function Deals() {
  const time = useCountdown(60 * 60);
  return (
    <section className="py-12 sm:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-6 sm:mb-12">
          <h2 className="text-2xl sm:text-4xl font-bold text-navy">Exclusive Offers & Discounts</h2>
          <p className="mt-2 sm:mt-3 text-sm sm:text-base text-muted-foreground">Limited-time deals to save more on your next trip</p>
        </div>

        {/* Mobile: horizontal scroll snap */}
        <div className="sm:hidden -mx-4 px-4">
          <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide after:content-[''] after:w-1 after:shrink-0">
            {deals.map((d) => (
              <DealCard key={d.title} d={d} time={time} mobile />
            ))}
          </div>
        </div>

        {/* Desktop: grid */}
        <div className="hidden sm:grid grid-cols-3 gap-6 stagger-children">
          {deals.map((d) => (
            <DealCard key={d.title} d={d} time={time} />
          ))}
        </div>
      </div>
    </section>
  );
}

function DealCard({ d, time, mobile }: { d: (typeof deals)[number]; time: string; mobile?: boolean }) {
  return (
    <div
      className={`rounded-2xl p-5 sm:p-6 bg-gradient-to-br from-navy to-brand text-white relative overflow-hidden hover:-translate-y-1 transition shadow-lg ${mobile ? "snap-start shrink-0 w-[240px]" : ""
        }`}
    >
      <div className="absolute -top-10 -right-10 h-40 w-40 bg-brand-light/20 rounded-full blur-2xl" />
      <d.icon className="h-7 w-7 sm:h-9 sm:w-9 text-brand-light" />
      <h3 className="mt-3 text-lg sm:text-xl font-bold">{d.title}</h3>
      <p className="mt-1 text-white/80 text-xs sm:text-sm">{d.desc}</p>
      <p className="mt-3 text-[10px] sm:text-xs text-white/60">Use code</p>
      <p className="font-mono text-base sm:text-lg font-bold tracking-wider text-brand-light">{d.code}</p>
      <p className="mt-2 text-[10px] sm:text-xs text-white/70">Ends in</p>
      <p className="font-mono text-sm sm:text-base font-semibold">{time}</p>
      <button className="mt-3 sm:mt-4 w-full py-2 rounded-md bg-white text-navy text-sm font-medium hover:bg-brand-light transition">
        Claim Offer
      </button>
    </div>
  );
}
