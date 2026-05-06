import heroImg from "@/assets/hero-car.jpg";
import { Search, ShieldCheck, XCircle, Headphones, MapPin } from "lucide-react";
import { useScrollY } from "@/hooks/use-reveal";

export function Hero() {
  const y = useScrollY();
  return (
    <section
      id="home"
      className="relative min-h-[92vh] pt-16 flex items-center text-white overflow-hidden"
    >
      <img
        src={heroImg}
        alt="Car driving on scenic highway"
        width={1920}
        height={1088}
        className="absolute inset-0 w-full h-[115%] object-cover will-change-transform"
        style={{ transform: `translate3d(0, ${y * 0.35}px, 0) scale(1.05)` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-navy/95 via-navy/80 to-near-black/70" />
      {/* floating blobs */}
      <div className="pointer-events-none absolute -top-20 -left-20 w-80 h-80 rounded-full bg-brand/30 blur-3xl animate-blob" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-96 h-96 rounded-full bg-brand-light/25 blur-3xl animate-blob" style={{ animationDelay: "-6s" }} />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 w-full animate-fade-up">
        <div className="max-w-3xl">
          <span className="inline-block px-3 py-1 rounded-full bg-brand-light/20 text-brand-light text-xs font-medium border border-brand-light/30 mb-5">
            ⚡ Zero Deposit · Doorstep Delivery
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
            Drive Your Way — <span className="text-brand-light">Zero Deposit,</span> Unlimited Freedom
          </h1>
          <p className="mt-5 text-lg text-white/85 max-w-2xl">
            Self-drive & chauffeur cars starting ₹999/day. Doorstep delivery. No hidden charges.
          </p>
        </div>

        {/* Booking card */}
        <div className="mt-10 bg-background text-foreground rounded-2xl shadow-2xl shadow-black/30 p-5 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <Field label="Select City">
              <select className="field">
                <option>Mumbai</option>
                <option>Pune</option>
                <option>Nashik</option>
                <option>Aurangabad</option>
                <option>Nagpur</option>
              </select>
            </Field>
            <Field label="Trip Type">
              <select className="field">
                <option>Self Drive</option>
                <option>With Driver</option>
                <option>Outstation</option>
                <option>Airport Transfer</option>
              </select>
            </Field>
            <Field label="Pickup Date & Time">
              <input className="field" type="datetime-local" />
            </Field>
            <Field label="Return Date & Time">
              <input className="field" type="datetime-local" />
            </Field>
            <button className="bg-brand hover:bg-brand/90 text-brand-foreground rounded-lg font-semibold flex items-center justify-center gap-2 h-[52px] mt-auto transition transform hover:-translate-y-0.5">
              <Search className="h-5 w-5" /> Search Cars
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
          <Badge icon={<ShieldCheck className="h-4 w-4" />} text="Zero Deposit" />
          <Badge icon={<XCircle className="h-4 w-4" />} text="Free Cancellation" />
          <Badge icon={<Headphones className="h-4 w-4" />} text="24/7 Support" />
          <Badge icon={<MapPin className="h-4 w-4" />} text="GPS Enabled" />
        </div>
      </div>

      <style>{`
        .field {
          width: 100%;
          height: 48px;
          padding: 0 12px;
          border-radius: 0.5rem;
          background: var(--color-soft);
          border: 1px solid var(--color-border);
          font-size: 0.95rem;
          color: var(--color-foreground);
          outline: none;
        }
        .field:focus { border-color: var(--color-brand); }
      `}</style>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
        {label}
      </span>
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
