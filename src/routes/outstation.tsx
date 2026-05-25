import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";
import { ShieldCheck, MapPin, Search, Calendar as CalIcon, MessageCircle, Users, ClipboardCheck, UserCheck, Clock, ArrowRight, Check, X, Car } from "lucide-react";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { useState, useEffect } from "react";
import { setPageMeta } from "@/lib/meta";
import { bookOnWhatsApp } from "@/lib/whatsapp";
import { PriceCalculator } from "@/components/site/PriceCalculator";

export const Route = createFileRoute("/outstation")({
  component: OutstationPage,
});

const routes = [
  { from: "Mumbai", to: "Pune", km: 150, hr: "2.5", price: 2100, popular: true },
  { from: "Mumbai", to: "Shirdi", km: 240, hr: "4", price: 3300, popular: true },
  { from: "Mumbai", to: "Goa", km: 590, hr: "9", price: 8200, popular: true },
  { from: "Mumbai", to: "Lonavala", km: 83, hr: "1.5", price: 1200, popular: false },
  { from: "Mumbai", to: "Mahabaleshwar", km: 260, hr: "5", price: 3700, popular: false },
  { from: "Mumbai", to: "Nashik", km: 170, hr: "3", price: 2400, popular: false },
  { from: "Mumbai", to: "Nagpur", km: 870, hr: "13", price: 12000, popular: false },
  { from: "Mumbai", to: "Kolhapur", km: 380, hr: "6", price: 5400, popular: false },
  { from: "Pune", to: "Mahabaleshwar", km: 120, hr: "2.5", price: 1700, popular: false },
  { from: "Pune", to: "Kolhapur", km: 230, hr: "4", price: 3200, popular: false },
  { from: "Mumbai", to: "Alibag", km: 100, hr: "2", price: 1500, popular: false },
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

  const [toCity, setToCity] = useState("");
  const [date, setDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState("1");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const minDate = new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString().slice(0, 16);

  useEffect(() => {
    setPageMeta({
      title: "Outstation Cabs from Mumbai & Pune | Manasvi Tours",
      description: "Book chauffeur-driven outstation cabs across India. Sedan, SUV & luxury cars from ₹14/km. Transparent pricing, on-time pickup.",
      url: "/outstation"
    });
  }, []);

  const handleSearch = () => {
    const newErrors: Record<string, string> = {};
    if (!toCity.trim()) newErrors.toCity = "Destination required";
    else if (toCity.toLowerCase() === "mumbai") newErrors.toCity = "Destination cannot be Mumbai";
    
    if (!date) newErrors.date = "Pickup date required";
    else if (date < minDate) newErrors.date = "Must be at least 12 hours from now";

    if (round) {
      if (!returnDate) newErrors.returnDate = "Return date required";
      else if (date && new Date(returnDate) < new Date(date)) newErrors.returnDate = "Must be after pickup";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    
    bookOnWhatsApp({
      tripType: round ? "Outstation (Round Trip)" : "Outstation",
      from: "Mumbai",
      to: toCity,
      date: date + (round && returnDate ? ` to ${returnDate}` : ""),
      passengers,
    });
  };

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <Navbar />
      <main className="relative">
        {/* Coming Soon Overlay */}
        <div className="absolute inset-0 bg-background/60 backdrop-blur-md z-40 flex items-start justify-center pt-32 sm:pt-40 px-4">
          <div className="max-w-md w-full bg-card/90 border border-border/80 backdrop-blur-lg rounded-2xl p-8 text-center shadow-2xl relative overflow-hidden float-soft">
            <div className="pointer-events-none absolute -top-10 -left-10 w-40 h-40 rounded-full bg-brand/10 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-brand-light/10 blur-2xl" />
            
            <div className="relative">
              <span className="inline-block px-3 py-1 rounded-full bg-brand/10 text-brand text-xs font-semibold uppercase tracking-wider mb-4 border border-brand/20">
                Coming Soon
              </span>
              <h2 className="text-3xl font-extrabold text-navy tracking-tight">Outstation Cabs</h2>
              <p className="mt-4 text-muted-foreground text-sm leading-relaxed">
                We are currently setting up our premium outstation cab booking service. For any urgent bookings, please reach out to us directly on WhatsApp!
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <a
                  href="https://wa.me/919821790471?text=Hi%20Manasvi%20Tours!%20I'm%20interested%20in%20booking%20an%20Outstation%20Cab."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-brand text-brand-foreground font-semibold hover:bg-brand/90 transition shadow-lg shadow-brand/25 flex items-center justify-center gap-2"
                >
                  <MessageCircle className="h-5 w-5" /> Book via WhatsApp
                </a>
                <Link
                  to="/"
                  className="w-full py-3 px-4 rounded-xl bg-soft text-foreground font-semibold hover:bg-muted transition flex items-center justify-center"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* Hero */}
        <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-20 bg-gradient-to-br from-navy via-navy to-near-black text-white overflow-hidden">
          <div className="pointer-events-none absolute -top-20 -left-20 w-80 h-80 rounded-full bg-brand/30 blur-3xl animate-blob" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <Reveal variant="up">
              <h1 className="text-3xl sm:text-5xl font-bold leading-tight">
                Book Outstation Cab — <span className="text-brand-light">Comfortable, On Time, Affordable</span>
              </h1>
              <p className="mt-4 text-white/80 max-w-2xl">
                Chauffeur-driven sedans, SUVs and luxury cars across India and beyond.
              </p>
            </Reveal>
            <div className="mt-8 bg-background text-foreground rounded-2xl shadow-2xl p-4 sm:p-6 float-soft">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
                <Field label="From"><input className="field bg-muted text-muted-foreground cursor-not-allowed" value="Mumbai" readOnly /></Field>
                <Field label="To" error={errors.toCity}><input className={`field ${errors.toCity ? 'border-red-500' : ''}`} placeholder="Anywhere in India" value={toCity} onChange={e => {setToCity(e.target.value); setErrors(p => ({...p, toCity: ''}))}} /></Field>
                <Field label="Pickup Date" error={errors.date}><input className={`field ${errors.date ? 'border-red-500' : ''}`} type="datetime-local" min={minDate} value={date} onChange={e => {setDate(e.target.value); setErrors(p => ({...p, date: ''}))}} /></Field>
                <Field label={round ? "Return Date" : "Trip Type"} error={errors.returnDate}>
                  {round ? (
                    <input className={`field ${errors.returnDate ? 'border-red-500' : ''}`} type="date" value={returnDate} onChange={e => {setReturnDate(e.target.value); setErrors(p => ({...p, returnDate: ''}))}} />
                  ) : (
                    <button onClick={() => setRound(true)} className="field text-left text-muted-foreground">One-Way (toggle round trip)</button>
                  )}
                </Field>
                <Field label="Passengers">
                  <input
                    className="field"
                    type="number"
                    min={1}
                    max={17}
                    value={passengers}
                    onChange={e => setPassengers(e.target.value)}
                    placeholder="No. of passengers"
                  />
                </Field>
              </div>
              <div className="mt-4 flex items-center justify-between gap-4 flex-wrap">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={round} onChange={(e) => setRound(e.target.checked)} />
                  Round Trip
                </label>
                <button onClick={handleSearch} className="bg-brand hover:bg-brand/90 text-brand-foreground rounded-lg font-semibold px-6 h-12 flex items-center gap-2 transition">
                  <WhatsAppIcon className="h-5 w-5" /> Connect on WhatsApp
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
                  <button onClick={() => bookOnWhatsApp({ car: f.tier, tripType: 'Outstation' })} className="mt-5 w-full py-2.5 rounded-md bg-navy text-navy-foreground font-medium hover:bg-navy/90 transition">
                    Book {f.tier}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Reveal variant="up"><PriceCalculator /></Reveal>

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

function Field({ label, children, error }: { label: string; children: React.ReactNode; error?: string }) {
  return (
    <label className="block">
      <div className="flex justify-between items-end">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</span>
      </div>
      <div className="mt-1.5">{children}</div>
      {error && <p className="mt-1 text-[10px] text-red-500 font-medium">{error}</p>}
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
      <button onClick={() => bookOnWhatsApp({ from: r.from, to: r.to, tripType: trip === "round" ? "Outstation (Round Trip)" : "Outstation" })} className="mt-4 w-full py-2.5 rounded-md bg-brand text-brand-foreground font-medium hover:bg-brand/90 flex items-center justify-center gap-2 transition">
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
