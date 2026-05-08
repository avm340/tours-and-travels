import heroImg from "@/assets/hero-car.jpg";
import { Search, ShieldCheck, XCircle, Headphones, MapPin, Users, Star, Map } from "lucide-react";
import { useScrollY } from "@/hooks/use-reveal";
import { CountUp } from "./CountUp";
import { useState } from "react";

export function Hero() {
  const y = useScrollY();
  const [round, setRound] = useState(false);

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
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20 w-full animate-fade-up">
        <div className="max-w-3xl">
          <span className="inline-block px-3 py-1 rounded-full bg-brand-light/20 text-brand-light text-xs font-medium border border-brand-light/30 mb-4 sm:mb-5">
            ⚡ Zero Hidden Charges · Verified Drivers
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
            Your Journey, <span className="text-brand-light">Our Responsibility</span>
          </h1>
          <p className="mt-4 sm:mt-5 text-base sm:text-lg text-white/85 max-w-2xl">
            Chauffeur-driven outstation cabs &amp; curated tour packages across Maharashtra.
            Zero hidden charges. Book in 60 seconds.
          </p>
        </div>

        {/* Booking card */}
        <div className="mt-8 sm:mt-10 bg-background text-foreground rounded-2xl shadow-2xl shadow-black/30 p-4 sm:p-6">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <Field label="Trip Category">
              <select className="field">
                <option>Outstation</option>
                <option>Local — Half Day</option>
                <option>Local — Full Day</option>
                <option>Airport Transfer</option>
                <option>Tour Package</option>
              </select>
            </Field>
            <Field label="From City">
              <select className="field">
                <option>Mumbai</option><option>Pune</option><option>Nashik</option>
                <option>Aurangabad</option><option>Nagpur</option>
              </select>
            </Field>
            <Field label="To City">
              <select className="field">
                <option>Pune</option><option>Shirdi</option><option>Nashik</option>
                <option>Goa</option><option>Aurangabad</option><option>Mahabaleshwar</option>
              </select>
            </Field>
            <Field label="Pickup Date &amp; Time">
              <input className="field" type="datetime-local" />
            </Field>
            {round && (
              <Field label="Return Date">
                <input className="field" type="date" />
              </Field>
            )}
            <Field label="Passengers">
              <select className="field">
                <option>1-2</option><option>3-4</option><option>5-6</option><option>7+</option>
              </select>
            </Field>
            <button className={`w-full bg-brand hover:bg-brand/90 text-brand-foreground rounded-lg font-semibold flex items-center justify-center gap-2 h-[52px] lg:mt-auto transition transform hover:-translate-y-0.5 ${round ? "" : "lg:col-start-3"}`}>
              <Search className="h-5 w-5" /> Search Cabs
            </button>
          </div>
        </div>

        {/* Trust counters */}
        <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-6">
          <Counter icon={<Users className="h-5 w-5" />} value={<CountUp to={12000} suffix="+" />} label="Happy Customers" />
          <Counter icon={<Map className="h-5 w-5" />} value={<CountUp to={50} suffix="+" />} label="Destinations" />
          <Counter icon={<Star className="h-5 w-5" />} value={<><CountUp to={4.8} decimals={1} />★</>} label="Average Rating" />
        </div>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
          <Badge icon={<ShieldCheck className="h-4 w-4" />} text="Verified Drivers" />
          <Badge icon={<XCircle className="h-4 w-4" />} text="Free Cancellation" />
          <Badge icon={<Headphones className="h-4 w-4" />} text="24/7 Support" />
          <Badge icon={<MapPin className="h-4 w-4" />} text="GPS Tracked" />
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

function Badge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 border border-white/20 backdrop-blur-sm text-white">
      <span className="text-brand-light">{icon}</span>
      <span className="font-medium">{text}</span>
    </div>
  );
}

function Counter({ icon, value, label }: { icon: React.ReactNode; value: React.ReactNode; label: string }) {
  return (
    <div className="rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm px-4 py-4 sm:py-5 text-center">
      <div className="flex items-center justify-center gap-2 text-brand-light">
        {icon}
        <span className="text-2xl sm:text-3xl font-bold text-white tabular-nums">{value}</span>
      </div>
      <p className="mt-1 text-xs sm:text-sm text-white/75">{label}</p>
    </div>
  );
}
