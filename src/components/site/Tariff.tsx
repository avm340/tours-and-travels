import { Clock, Sun, Route, Plane, Check, X } from "lucide-react";
import { bookOnWhatsApp } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { useRef, useEffect } from "react";

/* ── Reordered so "Most Popular" (Local Full Day) is at index 1 — visually center of 4 columns ── */
const plans = [
  {
    icon: Clock,
    name: "Local Half Day",
    price: "₹899",
    unit: " / 4hr · 40km",
    features: ["Chauffeur included", "Within city limits", "Fuel included"],
    excluded: ["Toll & parking extra", "Extra km @ ₹12/km"],
  },
  {
    icon: Sun,
    name: "Local Full Day",
    price: "₹2199",
    unit: " / 8hr · 80km",
    popular: true,
    features: ["Chauffeur included", "Within city limits", "Fuel included", "Free cancellation"],
    excluded: ["Toll & parking extra", "Extra km @ ₹12/km"],
  },
  {
    icon: Route,
    name: "Outstation",
    price: "₹14",
    unit: " / km · min 250km",
    features: ["Per-km billing", "Driver bata included", "AC sedan baseline"],
    excluded: ["Toll, parking & permits extra", "Night charges after 10 PM"],
  },
  {
    icon: Plane,
    name: "Airport Transfer",
    price: "₹699",
    unit: " flat",
    features: ["One-way pickup/drop", "Toll included", "Meet & greet"],
    excluded: ["Waiting > 45 min chargeable"],
  },
];

export function Tariff() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-scroll to the "Most Popular" card on mobile
    if (scrollRef.current) {
      const popularIdx = plans.findIndex(p => p.popular);
      if (popularIdx >= 0) {
        const cards = scrollRef.current.children;
        if (cards[popularIdx]) {
          const card = cards[popularIdx] as HTMLElement;
          const scrollLeft = card.offsetLeft - (scrollRef.current.offsetWidth / 2) + (card.offsetWidth / 2);
          scrollRef.current.scrollTo({ left: Math.max(0, scrollLeft), behavior: "instant" });
        }
      }
    }
  }, []);

  return (
    <section id="tariff" className="py-12 sm:py-20 bg-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-6 sm:mb-12">
          <h2 className="text-2xl sm:text-4xl font-bold text-navy">Transparent Per-Trip Pricing</h2>
          <p className="mt-2 sm:mt-3 text-sm sm:text-base text-muted-foreground">Choose the plan that fits your journey</p>
        </div>

        {/* Mobile: horizontal scroll snap — auto-scrolls to popular */}
        <div className="sm:hidden -mx-4 px-4">
          <div
            ref={scrollRef}
            className="flex gap-3 overflow-x-auto snap-x snap-mandatory pt-4 pb-4 scrollbar-hide after:content-[''] after:w-1 after:shrink-0"
          >
            {plans.map((p) => (
              <PlanCard key={p.name} p={p} mobile />
            ))}
          </div>
        </div>

        {/* Desktop: grid with popular card elevated */}
        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-6 items-end">
          {plans.map((p) => (
            <PlanCard key={p.name} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PlanCard({ p, mobile }: { p: (typeof plans)[number]; mobile?: boolean }) {
  return (
    <div
      className={`relative rounded-2xl p-5 sm:p-6 bg-card border transition-all hover:-translate-y-1 hover:shadow-xl ${
        p.popular
          ? "border-brand ring-2 ring-brand shadow-xl sm:scale-[1.04] sm:z-10 sm:-my-2 sm:py-8"
          : "border-border"
      } ${mobile ? "snap-start shrink-0 w-[260px]" : ""}`}
    >
      {p.popular && (
        <>
          {/* Glow effect behind popular card */}
          <div className="hidden sm:block absolute inset-0 -z-10 rounded-2xl bg-brand/10 blur-xl scale-110" />
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-brand to-brand-light text-brand-foreground text-[10px] sm:text-xs font-semibold px-4 py-1.5 rounded-full z-10 shadow-lg shadow-brand/30 whitespace-nowrap">
            ⭐ Most Popular
          </span>
        </>
      )}
      {!p.popular && p.popular !== undefined ? null : null}
      <div className={`h-10 w-10 sm:h-12 sm:w-12 rounded-xl flex items-center justify-center ${
        p.popular ? "bg-brand text-white" : "bg-brand/10 text-brand"
      }`}>
        <p.icon className="h-5 w-5 sm:h-6 sm:w-6" />
      </div>
      <h3 className="mt-3 text-lg sm:text-xl font-bold text-navy">{p.name}</h3>
      <p className={`mt-2 font-bold ${p.popular ? "text-3xl sm:text-4xl text-brand" : "text-2xl sm:text-3xl text-near-black"}`}>
        {p.price}<span className={`font-normal ${p.popular ? "text-sm text-brand/70" : "text-xs sm:text-base text-muted-foreground"}`}>{p.unit}</span>
      </p>
      <ul className="mt-4 space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
        {p.features.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <Check className={`h-3.5 w-3.5 sm:h-4 sm:w-4 mt-0.5 shrink-0 ${p.popular ? "text-brand" : "text-brand"}`} />
            <span>{f}</span>
          </li>
        ))}
        {p.excluded.map((f) => (
          <li key={f} className="flex items-start gap-2 text-muted-foreground">
            <X className="h-3.5 w-3.5 sm:h-4 sm:w-4 mt-0.5 shrink-0" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <button
        onClick={() => bookOnWhatsApp({ tripType: p.name })}
        className={`mt-5 w-full py-2.5 sm:py-3 rounded-md font-medium text-sm transition ${
          p.popular
            ? "bg-brand text-brand-foreground hover:bg-brand/90 shadow-lg shadow-brand/25"
            : "bg-navy text-navy-foreground hover:bg-navy/90"
        }`}
      >
        <WhatsAppIcon className="inline-block h-4 w-4 mr-1.5 align-middle" /> Choose Plan
      </button>
    </div>
  );
}
