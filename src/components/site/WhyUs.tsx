import { CarFront, MapPin, Lock, Shield, Sparkles, Phone } from "lucide-react";

const features = [
  { icon: CarFront, title: "1000+ Verified Cabs", desc: "Largest chauffeur fleet across Maharashtra" },
  { icon: MapPin, title: "GPS Tracked", desc: "Live tracking for peace of mind" },
  { icon: Lock, title: "No Hidden Charges", desc: "Transparent pricing, always" },
  { icon: Shield, title: "Safe & Insured", desc: "All vehicles insured, drivers verified" },
  { icon: Sparkles, title: "Clean & Maintained", desc: "Spotless cars, every time" },
  { icon: Phone, title: "24/7 Support", desc: "We're always here for you" },
];

export function WhyUs() {
  return (
    <section id="why" className="py-12 sm:py-20 bg-navy text-navy-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-6 sm:mb-12">
          <h2 className="text-2xl sm:text-4xl font-bold">Why Manasvi Tours and Travels?</h2>
          <p className="mt-2 sm:mt-3 text-sm sm:text-base text-white/70">Everything you need for a worry-free journey</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 stagger-children">
          {features.map((f) => (
            <div
              key={f.title}
              className="p-3 sm:p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-brand-light/40 transition group tilt-card"
            >
              <div className="h-9 w-9 sm:h-12 sm:w-12 rounded-lg bg-brand text-brand-foreground flex items-center justify-center group-hover:scale-110 transition">
                <f.icon className="h-4 w-4 sm:h-6 sm:w-6" />
              </div>
              <h3 className="mt-2 sm:mt-4 text-sm sm:text-lg font-semibold leading-tight">{f.title}</h3>
              <p className="mt-0.5 sm:mt-1 text-[11px] sm:text-sm text-white/70 leading-tight">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
