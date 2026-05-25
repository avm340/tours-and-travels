import heroImg from "@/assets/hero-car.jpg";
import { Search, ShieldCheck, XCircle, Headphones, MapPin, Users, Star, Map, MessageCircle } from "lucide-react";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { useScrollY } from "@/hooks/use-reveal";
import { CountUp } from "./CountUp";
import { useState } from "react";

export function Hero() {
  const y = useScrollY();
  const [round, setRound] = useState(false);

  const [category, setCategory] = useState("Outstation");
  const [toCity, setToCity] = useState("");
  const [date, setDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState("1");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const minDate = new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString().slice(0, 16);

  const handleSearch = () => {
    const newErrors: Record<string, string> = {};
    if (!toCity.trim()) newErrors.toCity = "Destination is required";
    else if (toCity.toLowerCase() === "mumbai") newErrors.toCity = "Destination cannot be Mumbai";

    if (!date) newErrors.date = "Pickup date is required";
    else if (date < minDate) newErrors.date = "Must be at least 12 hours from now";

    if (round) {
      if (!returnDate) newErrors.returnDate = "Return date is required";
      else if (date && new Date(returnDate) < new Date(date)) newErrors.returnDate = "Must be after pickup date";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    import('@/lib/whatsapp').then(({ bookOnWhatsApp }) => {
      bookOnWhatsApp({
        tripType: round ? `${category} (Round Trip)` : category,
        from: "Mumbai",
        to: toCity,
        date: date + (round && returnDate ? ` to ${returnDate}` : ""),
        passengers,
      });
    });
  };

  return (
    <section
      id="home"
      className="relative min-h-[88vh] pt-16 flex items-center text-white overflow-hidden"
    >
      <img
        src={heroImg}
        alt="Chauffeur-driven cab on scenic highway"
        width={1920}
        height={1088}
        className="absolute inset-0 w-full h-[115%] object-cover will-change-transform"
        style={{ transform: `translate3d(0, ${y * 0.35}px, 0) scale(1.05)` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-navy/95 via-navy/80 to-near-black/70" />
      <div className="pointer-events-none absolute -top-20 -left-20 w-80 h-80 rounded-full bg-brand/30 blur-3xl animate-blob" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-96 h-96 rounded-full bg-brand-light/25 blur-3xl animate-blob" style={{ animationDelay: "-6s" }} />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-20 w-full animate-fade-up">
        <div className="max-w-3xl">
          <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-brand-light/20 text-brand-light text-xs sm:text-sm font-medium border border-brand-light/30 mb-4 sm:mb-6 shadow-sm">
            ⚡ Zero Hidden Charges · Verified Drivers
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
            Your Journey, <br className="sm:hidden" />
            <span className="text-brand-light shimmer-text">Our Responsibility</span>
          </h1>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-white/90 max-w-2xl leading-relaxed">
            Chauffeur-driven outstation cabs &amp; curated tour packages across India.
            Zero hidden charges.
          </p>
        </div>

        {/* Booking card */}
        <div className="mt-8 sm:mt-10 bg-background text-foreground rounded-2xl shadow-2xl shadow-black/30 p-4 sm:p-6 float-soft">
          {/* Round trip toggle */}
          <div className="mb-4 flex items-center gap-3">
            <button
              type="button"
              role="switch"
              aria-checked={round}
              onClick={() => setRound((v) => !v)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${round ? "bg-brand" : "bg-muted"}`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${round ? "translate-x-5" : "translate-x-0.5"}`}
              />
            </button>
            <span className="text-sm font-medium text-foreground">Round Trip</span>
            <span className="text-xs text-muted-foreground hidden sm:inline">
              {round ? "Return date enabled" : "Toggle for return journey"}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 items-start">
            <Field label="Trip Category">
              <select className="field" value={category} onChange={e => setCategory(e.target.value)}>
                <option>Outstation</option>
                <option>Local — Half Day</option>
                <option>Local — Full Day</option>
                <option>Airport Transfer</option>
                <option>Tour Package</option>
              </select>
            </Field>
            <Field label="From City">
              <input className="field bg-muted text-muted-foreground cursor-not-allowed" type="text" value="Mumbai" readOnly />
            </Field>
            <Field label="To City" error={errors.toCity}>
              <input className={`field ${errors.toCity ? 'border-red-500' : ''}`} type="text" placeholder="Anywhere in India" value={toCity} onChange={e => { setToCity(e.target.value); setErrors(p => ({ ...p, toCity: '' })) }} />
            </Field>
            <Field label="Pickup Date &amp; Time" error={errors.date}>
              <input className={`field ${errors.date ? 'border-red-500' : ''}`} type="datetime-local" min={minDate} value={date} onChange={e => { setDate(e.target.value); setErrors(p => ({ ...p, date: '' })) }} />
            </Field>
            {round && (
              <Field label="Return Date" error={errors.returnDate}>
                <input className={`field ${errors.returnDate ? 'border-red-500' : ''}`} type="date" value={returnDate} onChange={e => { setReturnDate(e.target.value); setErrors(p => ({ ...p, returnDate: '' })) }} />
              </Field>
            )}
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
            <button onClick={handleSearch} className={`w-full bg-brand hover:bg-brand/90 text-brand-foreground rounded-lg font-semibold flex items-center justify-center gap-2 h-[52px] lg:mt-[22px] transition transform hover:-translate-y-0.5 ${round ? "" : "lg:col-start-3"}`}>
              <WhatsAppIcon className="h-5 w-5" /> Connect on WhatsApp
            </button>
          </div>
        </div>
        <p className="mt-2 text-center text-[11px] text-white/50">
          By booking, you agree to our{" "}
          <a href="/tnc" className="underline hover:text-white/80 transition">Terms &amp; Conditions</a>.
        </p>

        {/* Trust counters */}
        <div className="mt-6 sm:mt-8 grid grid-cols-3 gap-2 sm:gap-6">
          <Counter icon={<Users className="h-4 w-4 sm:h-5 sm:w-5" />} value={<CountUp to={12000} suffix="+" />} label="Happy Travellers" />
          <Counter icon={<Map className="h-4 w-4 sm:h-5 sm:w-5" />} value={<CountUp to={50} suffix="+" />} label="Destinations" />
          <Counter icon={<Star className="h-4 w-4 sm:h-5 sm:w-5" />} value={<><CountUp to={4.8} decimals={1} />★</>} label="Average Rating" />
        </div>

        {/* Mobile: 2x2 grid badges */}
        <div className="sm:hidden mt-4">
          <div className="grid grid-cols-2 gap-2">
            <Badge icon={<ShieldCheck className="h-3.5 w-3.5" />} text="Verified Drivers" />
            <Badge icon={<XCircle className="h-3.5 w-3.5" />} text="Free Cancellation" />
            <Badge icon={<Headphones className="h-3.5 w-3.5" />} text="24/7 Support" />
            <Badge icon={<MapPin className="h-3.5 w-3.5" />} text="GPS Tracked" />
          </div>
        </div>
        {/* Desktop: grid badges */}
        <div className="hidden sm:grid grid-cols-4 gap-3 mt-6 text-sm">
          <Badge icon={<ShieldCheck className="h-4 w-4" />} text="Verified Drivers" />
          <Badge icon={<XCircle className="h-4 w-4" />} text="Free Cancellation" />
          <Badge icon={<Headphones className="h-4 w-4" />} text="24/7 Support" />
          <Badge icon={<MapPin className="h-4 w-4" />} text="GPS Tracked" />
        </div>
      </div>

      <style>{`
        .field {
          width: 100%; height: 44px; padding: 0 12px;
          border-radius: 0.5rem; background: var(--color-soft);
          border: 1px solid var(--color-border); font-size: 0.875rem;
          color: var(--color-foreground); outline: none;
        }
        @media (min-width: 640px) { .field { height: 48px; font-size: 0.95rem; } }
        .field:focus { border-color: var(--color-brand); }
      `}</style>
    </section>
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

function Badge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-white/10 border border-white/20 backdrop-blur-sm text-white justify-center sm:justify-start">
      <span className="text-brand-light shrink-0">{icon}</span>
      <span className="font-medium text-xs sm:text-sm whitespace-nowrap">{text}</span>
    </div>
  );
}

function Counter({ icon, value, label }: { icon: React.ReactNode; value: React.ReactNode; label: string }) {
  return (
    <div className="rounded-xl sm:rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm px-2 sm:px-4 py-3 sm:py-5 text-center">
      <div className="flex items-center justify-center gap-1 sm:gap-2 text-brand-light">
        <span className="hidden sm:inline">{icon}</span>
        <span className="text-xl sm:text-3xl font-bold text-white tabular-nums">{value}</span>
      </div>
      <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-sm text-white/75 leading-tight">{label}</p>
    </div>
  );
}
