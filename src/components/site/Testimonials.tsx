import { Star, Quote } from "lucide-react";

const reviews = [
  { name: "Rohan Sharma", city: "Mumbai", text: "Excellent service, clean car, on-time pickup! Will definitely book again with Manasvi for our next trip." },
  { name: "Priya Deshmukh", city: "Pune", text: "Easy booking and transparent pricing — highly recommend Manasvi! The driver was professional and courteous." },
  { name: "Amit Patil", city: "Nashik", text: "Best outstation cab experience in Maharashtra. Smooth pickup, transparent pricing, and great support throughout." },
];

export function Testimonials() {
  return (
    <section className="py-12 sm:py-20 bg-navy text-navy-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-6 sm:mb-10">
          <h2 className="text-2xl sm:text-4xl font-bold">What Our Travellers Say</h2>
          <p className="mt-2 sm:mt-3 text-sm sm:text-base text-white/70">Trusted by 12,000+ happy travellers across Maharashtra</p>
        </div>

        {/* Mobile: horizontal scroll snap */}
        <div className="sm:hidden -mx-4 px-4">
          <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide after:content-[''] after:w-1 after:shrink-0">
            {reviews.map((r) => (
              <div
                key={r.name}
                className="snap-start shrink-0 w-[280px] p-5 rounded-xl bg-white/5 border border-white/10 relative"
              >
                <Quote className="h-6 w-6 text-brand-light/20 absolute top-4 right-4" />
                <div className="flex gap-0.5 text-brand-light">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <p className="mt-3 text-xs leading-relaxed text-white/85">"{r.text}"</p>
                <div className="mt-4 pt-3 border-t border-white/10">
                  <p className="font-semibold text-white text-sm">{r.name}</p>
                  <p className="text-[10px] text-white/60">{r.city}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: grid */}
        <div className="hidden sm:grid grid-cols-3 gap-6">
          {reviews.map((r) => (
            <div key={r.name} className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-brand-light/40 transition relative">
              <Quote className="h-8 w-8 text-brand-light/10 absolute top-5 right-5" />
              <div className="flex gap-1 text-brand-light">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-white/85">"{r.text}"</p>
              <div className="mt-5 pt-4 border-t border-white/10">
                <p className="font-semibold text-white">{r.name}</p>
                <p className="text-xs text-white/60">{r.city}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
