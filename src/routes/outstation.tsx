import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";
import { MapPin, Users, Clock, ArrowRight, Check, Car, Phone, Shield, Fuel, IndianRupee, Navigation, Zap, Headphones, MapPinCheck } from "lucide-react";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { useState, useEffect, useMemo } from "react";
import { setPageMeta } from "@/lib/meta";
import { bookOnWhatsApp } from "@/lib/whatsapp";

export const Route = createFileRoute("/outstation")({
  component: OutstationPage,
});

/* ── Route Data ── */
const ROUTES = [
  { from: "Mumbai", to: "Pune", km: 150, hr: "2.5", price: 2100, popular: true },
  { from: "Mumbai", to: "Shirdi", km: 240, hr: "4", price: 3360, popular: true },
  { from: "Mumbai", to: "Goa", km: 590, hr: "9", price: 8260, popular: true },
  { from: "Mumbai", to: "Lonavala", km: 83, hr: "1.5", price: 1162, popular: false },
  { from: "Mumbai", to: "Mahabaleshwar", km: 260, hr: "5", price: 3640, popular: false },
  { from: "Mumbai", to: "Nashik", km: 170, hr: "3", price: 2380, popular: false },
  { from: "Mumbai", to: "Nagpur", km: 870, hr: "13", price: 12180, popular: false },
  { from: "Mumbai", to: "Kolhapur", km: 380, hr: "6", price: 5320, popular: false },
  { from: "Mumbai", to: "Alibag", km: 100, hr: "2", price: 1400, popular: false },
  { from: "Mumbai", to: "Aurangabad", km: 330, hr: "5.5", price: 4620, popular: false },
  { from: "Mumbai", to: "Ratnagiri", km: 330, hr: "6", price: 4620, popular: false },
  { from: "Mumbai", to: "Solapur", km: 400, hr: "7", price: 5600, popular: false },
];

/* ── Fleet / Car Options ── */
const FLEET = [
  {
    tier: "Sedan",
    model: "Maruti Swift / Dzire",
    pax: 4,
    rate: 14,
    features: ["AC", "Music System", "Ample Boot Space", "Economical"],
    img: "/cars/swift/swift-4.jpg",
  },
  {
    tier: "SUV",
    model: "Toyota Innova / Rumion",
    pax: 7,
    rate: 18,
    features: ["Spacious Interior", "AC", "Charging Points", "Family Friendly"],
    img: "/cars/toyota-innova/innova-4.jpg",
  },
  {
    tier: "Premium",
    model: "Innova Crysta / Crysta Bucket",
    pax: 7,
    rate: 20,
    features: ["Premium Comfort", "Recliner Seats", "AC", "Corporate Ready"],
    img: "/cars/innova-crysta-7-seater/innova-5.jpg",
  },
  {
    tier: "Luxury Van",
    model: "Force Urbania Traveller",
    pax: 16,
    rate: 35,
    features: ["Pushback Recliners", "LED Ambience", "AC", "Group Travel"],
    img: "/cars/urbania/urbania-3.jpg",
  },
];

/* ── Steps ── */
const STEPS = [
  { n: 1, title: "Enter Route & Date", desc: "Pick your city, destination, and travel date.", icon: <MapPin className="h-5 w-5" /> },
  { n: 2, title: "Choose Your Car", desc: "Sedan, SUV, Crysta or Traveller — pick your ride.", icon: <Car className="h-5 w-5" /> },
  { n: 3, title: "Driver Picks You Up", desc: "Verified driver arrives at your doorstep. You ride, we drive.", icon: <Navigation className="h-5 w-5" /> },
];

/* ── Trust Badges ── */
const BADGES = [
  { icon: <IndianRupee className="h-4 w-4" />, text: "Zero Hidden Charges" },
  { icon: <Shield className="h-4 w-4" />, text: "Verified Drivers" },
  { icon: <Check className="h-4 w-4" />, text: "Free Cancellation" },
  { icon: <Headphones className="h-4 w-4" />, text: "24/7 Support" },
  { icon: <MapPinCheck className="h-4 w-4" />, text: "GPS Tracked" },
];

function OutstationPage() {
  const [from] = useState("Mumbai");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [tripType, setTripType] = useState<"one" | "round">("one");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const minDate = useMemo(() => new Date(Date.now() + 12 * 3600000).toISOString().slice(0, 10), []);

  useEffect(() => {
    setPageMeta({
      title: "Outstation Cabs from Mumbai — Pay Per KM | Manasvi Tours",
      description: "Book chauffeur-driven outstation cabs from Mumbai. Sedan from ₹14/km, SUV from ₹18/km. Zero hidden charges, verified drivers, 24/7 support.",
      url: "/outstation",
    });
  }, []);

  const handleBook = () => {
    const errs: Record<string, string> = {};
    if (!to.trim()) errs.to = "Drop city required";
    if (!date) errs.date = "Date required";
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    bookOnWhatsApp({
      tripType: tripType === "round" ? "Outstation (Round Trip)" : "Outstation (One-Way)",
      from,
      to,
      date,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* ═══════════════════ HERO + BOOKING FORM ═══════════════════ */}
        <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 bg-gradient-to-br from-navy via-navy to-near-black text-white overflow-hidden">
          <div className="pointer-events-none absolute -top-20 -left-20 w-80 h-80 rounded-full bg-brand/30 blur-3xl animate-blob" />
          <div className="pointer-events-none absolute bottom-0 right-0 w-96 h-96 rounded-full bg-brand-light/20 blur-3xl animate-blob" style={{ animationDelay: "-6s" }} />

          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <Reveal variant="up">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
                Go Anywhere. <span className="text-brand-light">Pay Per KM.</span>
              </h1>
              <p className="mt-4 text-white/75 max-w-xl text-base sm:text-lg">
                Chauffeur-driven cabs to 50+ destinations across India. Transparent per-km pricing, no surprises.
              </p>
            </Reveal>

            {/* Booking Card */}
            <div className="mt-10 bg-card text-foreground rounded-2xl shadow-2xl border border-border/40 p-5 sm:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                <InputField label="Pickup City">
                  <input className="os-field bg-muted text-muted-foreground cursor-not-allowed" value="Mumbai" readOnly />
                </InputField>
                <InputField label="Drop City" error={errors.to}>
                  <input
                    className={`os-field ${errors.to ? "border-red-500" : ""}`}
                    placeholder="e.g. Pune, Goa, Shirdi"
                    value={to}
                    onChange={e => { setTo(e.target.value); setErrors(p => ({ ...p, to: "" })); }}
                  />
                </InputField>
                <InputField label="Pickup Date" error={errors.date}>
                  <input
                    className={`os-field ${errors.date ? "border-red-500" : ""}`}
                    type="date"
                    min={minDate}
                    value={date}
                    onChange={e => { setDate(e.target.value); setErrors(p => ({ ...p, date: "" })); }}
                  />
                </InputField>
                <InputField label="Trip Type">
                  <div className="flex rounded-xl overflow-hidden border border-border h-[48px]">
                    <button
                      onClick={() => setTripType("one")}
                      className={`flex-1 text-sm font-semibold transition-colors ${tripType === "one" ? "bg-brand text-white" : "bg-soft text-muted-foreground hover:bg-muted"}`}
                    >
                      One Way
                    </button>
                    <button
                      onClick={() => setTripType("round")}
                      className={`flex-1 text-sm font-semibold transition-colors ${tripType === "round" ? "bg-brand text-white" : "bg-soft text-muted-foreground hover:bg-muted"}`}
                    >
                      Round Trip
                    </button>
                  </div>
                </InputField>
                <button
                  onClick={handleBook}
                  className="h-[48px] bg-brand hover:bg-brand/90 text-brand-foreground rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition shadow-lg shadow-brand/25"
                >
                  <WhatsAppIcon className="h-5 w-5" /> Check Price & Book
                </button>
              </div>
            </div>
          </div>

          <style>{`
            .os-field {
              width: 100%; height: 48px; padding: 0 14px;
              border-radius: 0.75rem; background: var(--color-soft);
              border: 1px solid var(--color-border); font-size: 0.95rem;
              color: var(--color-foreground); outline: none; transition: border-color 0.2s;
            }
            .os-field:focus { border-color: var(--color-brand); }
          `}</style>
        </section>

        {/* ═══════════════════ POPULAR ROUTES ═══════════════════ */}
        <section className="py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <Reveal variant="up">
              <div className="text-center mb-12">
                <h2 className="text-2xl sm:text-4xl font-bold text-navy">Popular Routes</h2>
                <p className="mt-3 text-muted-foreground">Starting prices shown for Sedan (₹14/km)</p>
              </div>
            </Reveal>
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {ROUTES.map(r => (
                <RouteCard key={r.to} r={r} />
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════ FLEET / CAR OPTIONS ═══════════════════ */}
        <section className="py-16 sm:py-24 bg-soft">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <Reveal variant="up">
              <div className="text-center mb-12">
                <h2 className="text-2xl sm:text-4xl font-bold text-navy">Choose Your Car</h2>
                <p className="mt-3 text-muted-foreground">From budget sedans to luxury travellers</p>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {FLEET.map(f => (
                <FleetCard key={f.tier} f={f} />
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════ HOW IT WORKS ═══════════════════ */}
        <section className="py-16 sm:py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <Reveal variant="up">
              <div className="text-center mb-12">
                <h2 className="text-2xl sm:text-4xl font-bold text-navy">How It Works</h2>
                <p className="mt-3 text-muted-foreground">Book in 60 seconds. Ride in comfort.</p>
              </div>
            </Reveal>
            <div className="relative max-w-lg mx-auto md:max-w-none grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {/* Connector line - Desktop */}
              <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-brand/20" />
              {/* Connector line - Mobile */}
              <div className="md:hidden absolute top-8 bottom-8 left-[1.75rem] w-0.5 bg-brand/20" />

              {STEPS.map(s => (
                <div key={s.n} className="relative flex items-start md:block md:bg-card md:border md:rounded-2xl md:p-6 text-left md:text-center md:hover:-translate-y-1 md:hover:shadow-lg transition-all group">
                  
                  {/* Step Number Circle */}
                  <div className="shrink-0 ml-1 mr-4 md:mx-auto h-12 w-12 md:h-14 md:w-14 rounded-full bg-brand text-brand-foreground flex items-center justify-center font-bold text-lg shadow-lg shadow-brand/30 ring-8 ring-background md:ring-0 relative z-10 mt-2 md:mt-0">
                    {s.n}
                  </div>
                  
                  {/* Step Content */}
                  <div className="flex-1 bg-card border md:border-none p-5 md:p-0 rounded-2xl md:rounded-none shadow-sm md:shadow-none md:mt-4 hover:shadow-md md:hover:shadow-none transition-shadow">
                    <div className="inline-flex items-center gap-2 text-navy md:text-brand font-bold text-base md:text-sm">
                      <span className="text-brand p-1.5 bg-brand/10 rounded-lg md:p-0 md:bg-transparent md:rounded-none">{s.icon}</span> {s.title}
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════ TRUST BADGES ═══════════════════ */}
        <section className="py-8 bg-soft border-y border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
              {BADGES.map(b => (
                <div key={b.text} className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <span className="text-brand">{b.icon}</span>
                  {b.text}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════ CTA STRIP ═══════════════════ */}
        <section className="py-16 sm:py-20 bg-gradient-to-br from-navy via-navy to-near-black text-white overflow-hidden relative">
          <div className="pointer-events-none absolute -top-20 -right-20 w-96 h-96 rounded-full bg-brand-light/15 blur-3xl animate-blob" />
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <Reveal variant="up">
              <h2 className="text-2xl sm:text-4xl font-bold">Need a Custom Route?</h2>
              <p className="mt-4 text-white/75 max-w-lg mx-auto">
                Going somewhere not listed? We cover all of India. Tell us your route and we'll share a quote within 30 minutes.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/919821790471?text=Hi%20Manasvi%20Tours!%20I%20need%20a%20cab%20for%20a%20custom%20outstation%20route."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#1FB955] text-white rounded-xl font-semibold px-8 py-3.5 flex items-center justify-center gap-2 transition shadow-lg"
                >
                  <WhatsAppIcon className="h-5 w-5" /> Contact Us on WhatsApp
                </a>
                <a
                  href="tel:+919821790471"
                  className="border border-white/30 rounded-xl font-semibold px-8 py-3.5 flex items-center justify-center gap-2 hover:bg-white/10 transition"
                >
                  <Phone className="h-4 w-4" /> +91 98217 90471
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

/* ── Sub-components ── */

function InputField({ label, children, error }: { label: string; children: React.ReactNode; error?: string }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{label}</span>
      <div className="mt-1.5">{children}</div>
      {error && <p className="mt-1 text-[10px] text-red-500 font-medium">{error}</p>}
    </label>
  );
}

function RouteCard({ r }: { r: typeof ROUTES[0] }) {
  return (
    <div className="relative rounded-xl sm:rounded-2xl bg-card border p-3.5 sm:p-5 hover:-translate-y-1 hover:shadow-xl transition-all group flex flex-col h-full">
      {r.popular && (
        <span className="absolute -top-2.5 right-3 bg-brand text-brand-foreground text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow z-10">
          Popular
        </span>
      )}
      <div className="flex items-start sm:items-center gap-1.5 sm:gap-2">
        <Car className="h-4 w-4 sm:h-5 sm:w-5 text-brand shrink-0 mt-0.5 sm:mt-0" />
        <h3 className="font-bold text-navy text-sm sm:text-base leading-tight">
          <span className="text-xs sm:text-base text-muted-foreground font-medium sm:hidden">To </span>
          <span className="hidden sm:inline">{r.from} → </span>{r.to}
        </h3>
      </div>
      <div className="mt-2.5 sm:mt-3 flex flex-wrap items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs">
        <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 rounded bg-brand/10 text-brand font-semibold">{r.km} km</span>
        <span className="flex items-center gap-0.5 sm:gap-1 text-muted-foreground"><Clock className="h-3 w-3" /> ~{r.hr} hrs</span>
      </div>
      <div className="mt-auto pt-3">
        <p className="text-base sm:text-xl font-bold text-near-black">
          <span className="text-[10px] sm:text-xs text-muted-foreground font-normal block sm:inline">From </span>
          ₹{r.price.toLocaleString("en-IN")}
        </p>
        <button
          onClick={() => bookOnWhatsApp({ from: r.from, to: r.to, tripType: "Outstation" })}
          className="mt-2 sm:mt-3 w-full py-2 sm:py-2.5 rounded-lg bg-brand text-brand-foreground text-[11px] sm:text-sm font-semibold hover:bg-brand/90 flex items-center justify-center gap-1.5 sm:gap-2 transition group-hover:shadow-lg group-hover:shadow-brand/20"
        >
          Book <span className="hidden sm:inline">Now</span> <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
        </button>
      </div>
    </div>
  );
}

function FleetCard({ f }: { f: typeof FLEET[0] }) {
  return (
    <div className="rounded-2xl bg-card border overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all">
      <div className="h-44 overflow-hidden bg-muted">
        <img src={f.img} alt={f.model} className="w-full h-full object-cover" loading="lazy" width={400} height={176} />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-navy">{f.tier}</h3>
        <p className="text-xs text-muted-foreground mt-0.5">{f.model}</p>
        <div className="mt-3 flex items-center gap-1.5 text-sm text-muted-foreground">
          <Users className="h-4 w-4 text-brand" /> Up to {f.pax} passengers
        </div>
        <p className="mt-3 text-2xl font-bold text-brand">
          ₹{f.rate}<span className="text-sm font-normal text-muted-foreground">/km</span>
        </p>
        <ul className="mt-3 space-y-1">
          {f.features.map(feat => (
            <li key={feat} className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Check className="h-3 w-3 text-brand shrink-0" /> {feat}
            </li>
          ))}
        </ul>
        <button
          onClick={() => bookOnWhatsApp({ car: f.model, tripType: "Outstation" })}
          className="mt-4 w-full py-2.5 rounded-lg bg-navy text-navy-foreground text-sm font-semibold hover:bg-navy/90 transition"
        >
          Book {f.tier}
        </button>
      </div>
    </div>
  );
}
