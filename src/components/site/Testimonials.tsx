import { Quote } from "lucide-react";

const reviews = [
  { name: "Chandrakant Kadam", city: "Mumbai", rating: 5,   text: "Excellent service and very professional driver. The car was clean, comfortable, and arrived on time. Highly recommended for outstation trips!" },
  { name: "Sneha Patel",       city: "Pune",   rating: 4.5, text: "Our family trip was extremely comfortable because of their service. The driver was experienced and knew all the routes well." },
  { name: "Sandeep Sagvekar",  city: "Mumbai", rating: 4,   text: "Highly satisfied with their corporate travel service. Always on time and very professional." },
];

const STAR = "10,1 12.9,7 19.5,7.6 14.5,12 16.2,18.5 10,15 3.8,18.5 5.5,12 0.5,7.6 7.1,7";

function StarRating({ rating, px = 14 }: { rating: number; px?: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
      {[0, 1, 2, 3, 4].map((i) => {
        const isFull = i + 1 <= Math.floor(rating);
        const isHalf = !isFull && i === Math.floor(rating) && rating % 1 >= 0.5;
        return (
          <span key={i} className="relative inline-block" style={{ width: px, height: px }}>
            {/* Empty star (always rendered as base) */}
            <svg width={px} height={px} viewBox="0 0 20 20" className="absolute inset-0">
              <polygon points={STAR} fill="rgba(255,255,255,0.15)" />
            </svg>
            {/* Full star */}
            {isFull && (
              <svg width={px} height={px} viewBox="0 0 20 20" className="absolute inset-0">
                <polygon points={STAR} fill="#80A1F8" />
              </svg>
            )}
            {/* Half star — clip right 50% */}
            {isHalf && (
              <svg width={px} height={px} viewBox="0 0 20 20" className="absolute inset-0" style={{ clipPath: "inset(0 50% 0 0)" }}>
                <polygon points={STAR} fill="#80A1F8" />
              </svg>
            )}
          </span>
        );
      })}
      <span className="ml-1 text-[11px] text-white/50 font-medium">{rating}/5</span>
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="relative py-12 sm:py-20 bg-navy text-navy-foreground overflow-hidden">
      <div className="pointer-events-none absolute -top-16 -right-16 w-80 h-80 rounded-full bg-brand/15 blur-[120px] animate-blob" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-64 h-64 rounded-full bg-brand-light/10 blur-[100px] animate-blob2" style={{ animationDelay: "-10s" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-6 sm:mb-10">
          <h2 className="text-2xl sm:text-4xl font-bold">What Our Travellers Say</h2>
          <p className="mt-2 sm:mt-3 text-sm sm:text-base text-white/70">Trusted by 10,000+ happy travellers across India</p>
          <span className="wave-divider mt-4 hidden sm:block" />
        </div>

        {/* Mobile */}
        <div className="sm:hidden -mx-4 px-4">
          <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide after:content-[''] after:w-1 after:shrink-0">
            {reviews.map((r) => (
              <div key={r.name} className="snap-start shrink-0 w-[280px] p-5 rounded-xl bg-white/5 border border-white/10 relative">
                <Quote className="h-6 w-6 text-brand-light/20 absolute top-4 right-4" />
                <StarRating rating={r.rating} px={14} />
                <p className="mt-3 text-xs leading-relaxed text-white/85">"{r.text}"</p>
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-brand/40 border border-brand-light/30 flex items-center justify-center text-xs font-bold text-brand-light shrink-0">{r.name[0]}</div>
                  <div>
                    <p className="font-semibold text-white text-sm">{r.name}</p>
                    <p className="text-[10px] text-white/60">{r.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden sm:grid grid-cols-3 gap-6 stagger-children">
          {reviews.map((r) => (
            <div key={r.name} className="glow-border p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-brand-light/40 transition-all duration-300 relative group tilt-card">
              <Quote className="h-10 w-10 text-brand-light/8 absolute top-5 right-5 transition-all duration-300 group-hover:text-brand-light/20 group-hover:scale-110" />
              <StarRating rating={r.rating} px={16} />
              <p className="mt-4 text-sm leading-relaxed text-white/85 group-hover:text-white/95 transition-colors duration-200">"{r.text}"</p>
              <div className="mt-5 pt-4 border-t border-white/10 flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-brand/40 border border-brand-light/30 flex items-center justify-center text-sm font-bold text-brand-light shrink-0 transition-transform duration-300 group-hover:scale-110">{r.name[0]}</div>
                <div>
                  <p className="font-semibold text-white group-hover:text-brand-light transition-colors duration-200">{r.name}</p>
                  <p className="text-xs text-white/60">{r.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
