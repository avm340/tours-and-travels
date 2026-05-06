import { useEffect, useState } from "react";
import { PartyPopper, CalendarHeart, Building2 } from "lucide-react";

const deals = [
  {
    icon: PartyPopper,
    title: "First Ride",
    desc: "15% off for new users",
    code: "MANASVI15",
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
  const time = useCountdown(60 * 60 * 12);
  return (
    <section className="py-12 sm:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-4xl font-bold text-navy">Exclusive Offers & Discounts</h2>
          <p className="mt-3 text-muted-foreground">Limited-time deals to save more on your ride</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {deals.map((d) => (
            <div
              key={d.title}
              className="rounded-2xl p-6 bg-gradient-to-br from-navy to-brand text-white relative overflow-hidden hover:-translate-y-1 transition shadow-lg"
            >
              <div className="absolute -top-10 -right-10 h-40 w-40 bg-brand-light/20 rounded-full blur-2xl" />
              <d.icon className="h-9 w-9 text-brand-light" />
              <h3 className="mt-4 text-xl font-bold">{d.title}</h3>
              <p className="mt-1 text-white/80 text-sm">{d.desc}</p>
              <p className="mt-3 text-xs text-white/60">Use code</p>
              <p className="font-mono text-lg font-bold tracking-wider text-brand-light">{d.code}</p>
              <p className="mt-3 text-xs text-white/70">Ends in</p>
              <p className="font-mono text-base font-semibold">{time}</p>
              <button className="mt-4 w-full py-2 rounded-md bg-white text-navy font-medium hover:bg-brand-light transition">
                Claim Offer
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
