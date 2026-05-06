import { CarFront, MapPin, Lock, Infinity as Inf, Sparkles, Phone } from "lucide-react";

const features = [
  { icon: CarFront, title: "1000+ Cars Available", desc: "Largest fleet across Maharashtra" },
  { icon: MapPin, title: "GPS in Every Vehicle", desc: "Navigate with confidence anywhere" },
  { icon: Lock, title: "No Hidden Charges", desc: "Transparent pricing, always" },
  { icon: Inf, title: "Unlimited Kilometres", desc: "Drive freely without km worries" },
  { icon: Sparkles, title: "Sanitized & Maintained", desc: "Spotless cars, every single time" },
  { icon: Phone, title: "24/7 Customer Support", desc: "We're here whenever you need us" },
];

export function WhyUs() {
  return (
    <section id="why" className="py-20 bg-navy text-navy-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold">Why Manasvi Tours and Travels?</h2>
          <p className="mt-3 text-white/70">Everything you need for a worry-free journey</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-brand-light/40 transition group"
            >
              <div className="h-12 w-12 rounded-lg bg-brand text-brand-foreground flex items-center justify-center group-hover:scale-110 transition">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-white/70">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
