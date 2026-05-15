import { Clock, Sun, Route, Plane, Check, X } from "lucide-react";

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
    price: "₹1499",
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
  return (
    <section id="tariff" className="py-12 sm:py-20 bg-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-6 sm:mb-12">
          <h2 className="text-2xl sm:text-4xl font-bold text-navy">Transparent Per-Trip Pricing</h2>
          <p className="mt-2 sm:mt-3 text-sm sm:text-base text-muted-foreground">Choose the plan that fits your journey</p>
        </div>

        {/* Mobile: horizontal scroll snap */}
        <div className="sm:hidden -mx-4 px-4">
          <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide after:content-[''] after:w-1 after:shrink-0">
            {plans.map((p) => (
              <PlanCard key={p.name} p={p} mobile />
            ))}
          </div>
        </div>

        {/* Desktop: grid */}
        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-6">
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
        p.popular ? "border-brand ring-2 ring-brand shadow-xl" : ""
      } ${mobile ? "snap-start shrink-0 w-[260px]" : ""}`}
    >
      {p.popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand text-brand-foreground text-[10px] sm:text-xs font-semibold px-3 py-1 rounded-full">
          Most Popular
        </span>
      )}
      <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-brand/10 text-brand flex items-center justify-center">
        <p.icon className="h-5 w-5 sm:h-6 sm:w-6" />
      </div>
      <h3 className="mt-3 text-lg sm:text-xl font-bold text-navy">{p.name}</h3>
      <p className="mt-2 text-2xl sm:text-3xl font-bold text-near-black">
        {p.price}<span className="text-xs sm:text-base font-normal text-muted-foreground">{p.unit}</span>
      </p>
      <ul className="mt-4 space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
        {p.features.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-brand mt-0.5 shrink-0" />
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
        className={`mt-5 w-full py-2.5 rounded-md font-medium text-sm transition ${
          p.popular
            ? "bg-brand text-brand-foreground hover:bg-brand/90"
            : "bg-navy text-navy-foreground hover:bg-navy/90"
        }`}
      >
        Choose Plan
      </button>
    </div>
  );
}
