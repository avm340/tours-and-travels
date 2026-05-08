import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";
import { MapPin, Clock, ArrowRight, Users, Check, X, Search, Car, ClipboardCheck, UserCheck } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/outstation")({
  head: () => ({
    meta: [
      { title: "Outstation Cabs from Mumbai & Pune — Manasvi Tours and Travels" },
      {
        name: "description",
        content:
          "Book chauffeur-driven outstation cabs across Maharashtra. Sedan, SUV & luxury cars from ₹14/km. Transparent pricing, on-time pickup.",
      },
      { property: "og:title", content: "Outstation Cabs — Manasvi Tours" },
      { property: "og:description", content: "Comfortable, on-time, affordable outstation cabs." },
    ],
  }),
  component: OutstationPage,
});

const routes = [
  { from: "Mumbai", to: "Pune", km: 150, hr: "2.5", price: 2100, popular: true },
  { from: "Mumbai", to: "Shirdi", km: 240, hr: "4", price: 3300, popular: true },
  { from: "Mumbai", to: "Nashik", km: 170, hr: "3", price: 2400, popular: false },
  { from: "Pune", to: "Goa", km: 460, hr: "7", price: 6500, popular: false },
  { from: "Mumbai", to: "Aurangabad", km: 340, hr: "5.5", price: 4800, popular: false },
  { from: "Pune", to: "Shirdi", km: 190, hr: "3.5", price: 2700, popular: false },
];

const fleet = [
  { tier: "Sedan", models: "Swift Dzire / Honda Amaze", pax: 4, rate: "₹14/km" },
  { tier: "SUV", models: "Innova / Ertiga", pax: 7, rate: "₹18/km" },
  { tier: "Luxury", models: "Fortuner / Innova Crysta", pax: 7, rate: "₹25/km" },
];

const inclusions = [
  "Driver bata & allowances",
  "Fuel charges",
  "Door-to-door pickup",
  "GPS tracking",
];
const exclusions = [
  "Toll, parking & state permits",
  "Night halt charges (₹300/night)",
  "Sightseeing detours beyond route",
  "GST as applicable",
];

function OutstationPage() {
  const [round, setRound] = useState(false);
  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-20 bg-gradient-to-br from-navy via-navy to-near-black text-white overflow-hidden">
          <div className="pointer-events-none absolute -top-20 -left-20 w-80 h-80 rounded-full bg-brand/30 blur-3xl animate-blob" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <Reveal variant="up">
              <h1 className="text-3xl sm:text-5xl font-bold leading-tight">
                Book Outstation Cab — <span className="text-brand-light">Comfortable, On Time, Affordable</span>
              </h1>
              <p className="mt-4 text-white/80 max-w-2xl">
                Chauffeur-driven sedans, SUVs and luxury cars across Maharashtra and beyond.
              </p>
            </Reveal>
            <div className="mt-8 bg-background text-foreground rounded-2xl shadow-2xl p-4 sm:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
                <Field label="From"><input className="field" placeholder="Mumbai" /></Field>
                <Field label="To"><input className="field" placeholder="Shirdi" /></Field>
                <Field label="Pickup Date"><input className="field" type="date" /></Field>
                <Field label={round ? "Return Date" : "Trip Type"}>
                  {round ? (
                    <input className="field" type="date" />
                  ) : (
                    <button onClick={() => setRound(true)} className="field text-left text-muted-foreground">One-Way (toggle round trip)</button>
                  )}
                </Field>
                <Field label="Passengers">
                  <select className="field">
                    <option>1-2</option><option>3-4</option><option>5-6</option><option>7+</option>
                  </select>
                </Field>
              </div>
              <div className="mt-4 flex items-center justify-between gap-4 flex-wrap">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={round} onChange={(e) => setRound(e.target.checked)} />
                  Round Trip
                </label>
                <button className="bg-brand hover:bg-brand/90 text-brand-foreground rounded-lg font-semibold px-6 h-12 flex items-center gap-2 transition">
                  <Search className="h-5 w-5" /> Search Cabs
                </button>
              </div>
            </div>
          </div>
          <style>{`
            .field {
              width: 100%; height: 48px; padding: 0 12px;
              border-radius: 0.5rem; background: var(--color-soft);
              border: 1px solid var(--color-border); font-size: 0.95rem;
              color: var(--color-foreground); outline: none;
            }
            .field:focus { border-color: var(--color-brand); }
          `}</style>
        </section>

        {/* Popular Routes */}
        <section className="py-12 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <Reveal variant="up">
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-4xl font-bold text-navy">Popular Outstation Routes</h2>
                <p className="mt-3 text-muted-foreground">Hand-picked routes our customers love</p>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {routes.map((r) => (
                <RouteCard key={r.from + r.to} r={r} />
              ))}
            </div>
          </div>
        </section>

        {/* How Outstation Booking Works */}
        <section className="py-12 sm:py-20 bg-soft">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <Reveal variant="up">
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-4xl font-bold text-navy">How Outstation Booking Works</h2>
                <p className="mt-3 text-muted-foreground">Three simple steps. Confirmed in minutes.</p>
              </div>
            </Reveal>
            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="hidden md:block absolute top-8 left-[16%] right-[16%] h-0.5 bg-brand/30" />
              <Step n={1} icon={<MapPin className="h-5 w-5" />} title="Select Route" desc="Pick your pickup, drop and travel date." />
              <Step n={2} icon={<ClipboardCheck className="h-5 w-5" />} title="Confirm Booking" desc="Choose car tier, review fare, pay securely." />
              <Step n={3} icon={<UserCheck className="h-5 w-5" />} title="Driver Assigned" desc="Receive driver details on WhatsApp & SMS." />
            </div>
          </div>
        </section>

        {/* Fleet */}
        <section className="py-12 sm:py-20 bg-soft">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <Reveal variant="up">
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-4xl font-bold text-navy">Choose Your Fleet</h2>
                <p className="mt-3 text-muted-foreground">Three tiers for every budget</p>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
              {fleet.map((f) => (
                <div key={f.tier} className="rounded-2xl bg-card border p-6 hover:-translate-y-1 hover:shadow-xl transition-all">
                  <h3 className="text-xl font-bold text-navy">{f.tier}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{f.models}</p>
                  <div className="mt-4 flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-brand" /> Up to {f.pax} passengers
                  </div>
                  <p className="mt-4 text-3xl font-bold text-brand">{f.rate}</p>
                  <button className="mt-5 w-full py-2.5 rounded-md bg-navy text-navy-foreground font-medium hover:bg-navy/90 transition">
                    Book {f.tier}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Inclusions / Exclusions */}
        <section className="py-12 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl bg-card border p-6">
              <h3 className="text-xl font-bold text-navy">What's Included</h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                {inclusions.map((i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-brand mt-0.5 shrink-0" /> {i}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-card border p-6">
              <h3 className="text-xl font-bold text-navy">What's Not Included</h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                {exclusions.map((i) => (
                  <li key={i} className="flex items-start gap-2 text-muted-foreground">
                    <X className="h-4 w-4 mt-0.5 shrink-0" /> {i}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

function RouteCard({ r }: { r: { from: string; to: string; km: number; hr: string; price: number; popular: boolean } }) {
  const [trip, setTrip] = useState<"one" | "round">("one");
  const price = trip === "one" ? r.price : Math.round(r.price * 1.85);
  return (
    <div className="relative rounded-2xl bg-card border p-5 hover:-translate-y-1 hover:shadow-xl transition-all">
      {r.popular && (
        <span className="absolute -top-2.5 right-4 bg-brand text-brand-foreground text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow">
          Most Booked
        </span>
      )}
      <div className="flex items-center gap-2 text-navy">
        <Car className="h-5 w-5 text-brand" />
        <h3 className="font-bold text-lg">{r.from} → {r.to}</h3>
      </div>
      <div className="mt-3 flex items-center gap-3 text-sm">
        <span className="px-2 py-1 rounded-md bg-brand/10 text-brand font-medium">{r.km} km</span>
        <span className="flex items-center gap-1 text-muted-foreground"><Clock className="h-4 w-4" />{r.hr} hr</span>
      </div>
      <div className="mt-4 inline-flex p-0.5 rounded-lg bg-soft border text-xs font-medium">
        <button
          onClick={() => setTrip("one")}
          className={`px-3 py-1.5 rounded-md transition ${trip === "one" ? "bg-brand text-brand-foreground" : "text-muted-foreground"}`}
        >
          One Way
        </button>
        <button
          onClick={() => setTrip("round")}
          className={`px-3 py-1.5 rounded-md transition ${trip === "round" ? "bg-brand text-brand-foreground" : "text-muted-foreground"}`}
        >
          Round Trip
        </button>
      </div>
      <p className="mt-3 text-2xl font-bold text-near-black">
        ₹{price.toLocaleString()}
        <span className="text-sm font-normal text-muted-foreground"> starting</span>
      </p>
      <button className="mt-4 w-full py-2.5 rounded-md bg-brand text-brand-foreground font-medium hover:bg-brand/90 flex items-center justify-center gap-2 transition">
        Book This Route <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}

function Step({ n, icon, title, desc }: { n: number; icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="relative bg-card border rounded-2xl p-6 text-center">
      <div className="mx-auto h-14 w-14 rounded-full bg-brand text-brand-foreground flex items-center justify-center font-bold text-lg shadow-lg shadow-brand/30">
        {n}
      </div>
      <div className="mt-3 inline-flex items-center gap-1.5 text-brand font-medium text-sm">
        {icon} {title}
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}
