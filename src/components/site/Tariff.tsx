import { Clock, Calendar, CalendarDays, CalendarRange, Check } from "lucide-react";

const plans = [
  {
    icon: Clock,
    name: "Hourly",
    price: "₹150",
    unit: "/hr",
    features: ["Minimum 4 hours", "~10 km/hr included", "Quick city errands", "Instant booking"],
  },
  {
    icon: Calendar,
    name: "Daily",
    price: "₹999",
    unit: "/day",
    popular: true,
    features: ["Unlimited km within city", "24-hour rental", "Free cancellation", "Doorstep delivery"],
  },
  {
    icon: CalendarDays,
    name: "Weekly",
    price: "Save 10%",
    unit: "",
    features: ["3–7 day bookings", "Best for vacations", "Free GPS navigation", "Priority support"],
  },
  {
    icon: CalendarRange,
    name: "Monthly",
    price: "Best Value",
    unit: "",
    features: ["10+ days special pricing", "Dedicated manager", "Free swap option", "Corporate friendly"],
  },
];

export function Tariff() {
  return (
    <section id="tariff" className="py-20 bg-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-navy">Flexible Plans for Every Trip</h2>
          <p className="mt-3 text-muted-foreground">Choose the plan that fits your journey</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative rounded-2xl p-6 bg-card border transition-all hover:-translate-y-1 hover:shadow-xl ${
                p.popular ? "border-brand ring-2 ring-brand shadow-xl" : ""
              }`}
            >
              {p.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand text-brand-foreground text-xs font-semibold px-3 py-1 rounded-full">
                  Most Popular
                </span>
              )}
              <div className="h-12 w-12 rounded-xl bg-brand/10 text-brand flex items-center justify-center">
                <p.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-xl font-bold text-navy">{p.name}</h3>
              <p className="mt-2 text-3xl font-bold text-near-black">
                {p.price}<span className="text-base font-normal text-muted-foreground">{p.unit}</span>
              </p>
              <ul className="mt-5 space-y-2.5 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-brand mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`mt-6 w-full py-2.5 rounded-md font-medium transition ${
                  p.popular
                    ? "bg-brand text-brand-foreground hover:bg-brand/90"
                    : "bg-navy text-navy-foreground hover:bg-navy/90"
                }`}
              >
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
