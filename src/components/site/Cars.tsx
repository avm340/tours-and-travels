import { useState, useEffect, useRef } from "react";
import { Users, Snowflake, ChevronLeft, ChevronRight } from "lucide-react";

import { Link } from "@tanstack/react-router";
import { carsData } from "@/data/cars";
import { bookOnWhatsApp } from "@/lib/whatsapp";

const tabs = ["All", "Sedan", "SUV", "Premium SUV", "Tempo Traveller"] as const;

function CarImageCarousel({ images, name }: { images: string[]; name: string }) {
  const [idx, setIdx] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Watch visibility with IntersectionObserver
  useEffect(() => {
    const el = containerRef.current;
    if (!el || images.length <= 1) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [images.length]);

  // Auto-advance only when visible and not hovered
  useEffect(() => {
    if (images.length <= 1) return;
    if (!visible || hovered) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setIdx((i) => (i + 1) % images.length);
    }, 3500);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [visible, hovered, images.length]);

  const prev = (e: React.MouseEvent) => {
    e.preventDefault();
    setIdx((i) => (i - 1 + images.length) % images.length);
  };
  const next = (e: React.MouseEvent) => {
    e.preventDefault();
    setIdx((i) => (i + 1) % images.length);
  };


  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/3] bg-soft overflow-hidden group/img"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Sliding track */}
      <div
        className="flex h-full transition-transform duration-[450ms] ease-in-out will-change-transform"
        style={{ transform: `translateX(-${idx * 100}%)` }}
      >
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`${name} view ${i + 1}`}
            loading="lazy"
            className="shrink-0 w-full h-full object-cover"
          />
        ))}
      </div>

      {/* Prev / Next — only show if multiple images */}
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition opacity-0 group-hover/img:opacity-100 z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition opacity-0 group-hover/img:opacity-100 z-10"
            aria-label="Next image"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          {/* Dots */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.preventDefault(); setIdx(i); }}
                className={`h-1.5 rounded-full transition-all ${i === idx ? "w-4 bg-white" : "w-1.5 bg-white/50"}`}
                aria-label={`Image ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}


export function Cars() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("All");
  const filtered = tab === "All" ? carsData : carsData.filter((c) => c.category === tab);
  return (
    <section id="cars" className="py-12 sm:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-4xl font-bold text-navy">Our Fleet</h2>
          <p className="mt-3 text-muted-foreground">Pick from our range of well-maintained, chauffeur-driven vehicles</p>
        </div>
        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-8 sm:mb-10">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition ${
                tab === t
                  ? "bg-brand text-brand-foreground shadow-md shadow-brand/30"
                  : "bg-soft text-navy hover:bg-brand-light/30"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 stagger-children">
          {filtered.map((c) => (
            <article
              key={c.name}
              className="group bg-card rounded-xl border overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 tilt-card"
            >
              {/* Image carousel (outside Link so buttons work) */}
              <div className="relative">
                <span className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-brand-light/95 text-navy text-[10px] sm:text-xs font-semibold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full z-10">
                  {c.category}
                </span>
                <Link to="/fleet/$carId" params={{ carId: c.id }} className="block">
                  <CarImageCarousel images={c.images} name={c.name} />
                </Link>
              </div>
              <Link to="/fleet/$carId" params={{ carId: c.id }} className="block">
                <div className="p-2.5 sm:p-4">
                  <h3 className="font-bold text-navy text-sm sm:text-lg leading-tight">{c.name}</h3>
                  <div className="mt-1.5 sm:mt-3 flex flex-wrap gap-x-2 sm:gap-x-3 gap-y-0.5 text-[10px] sm:text-xs text-muted-foreground">
                    <span className="flex items-center gap-0.5 sm:gap-1"><Users className="h-3 w-3 sm:h-3.5 sm:w-3.5" />{c.seats}S</span>
                    <span className="flex items-center gap-0.5 sm:gap-1"><Snowflake className="h-3 w-3 sm:h-3.5 sm:w-3.5" />AC/Non-AC</span>
                  </div>
                  <div className="mt-2 sm:mt-4 flex items-end justify-between">
                    <div>
                      <p className="text-[10px] sm:text-xs text-muted-foreground">From</p>
                      <p className="text-base sm:text-xl font-bold text-brand">₹{c.pricePerKm}<span className="text-[10px] sm:text-xs font-normal text-muted-foreground">/km</span></p>
                    </div>
                  </div>
                  <div className="mt-2 sm:mt-4 grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
                    <span className="hidden sm:inline-flex items-center justify-center px-3 py-2 text-sm rounded-md border border-brand text-brand hover:bg-brand/5 transition">
                      View Details
                    </span>
                    <button onClick={(e) => { e.preventDefault(); bookOnWhatsApp({ car: c.name }); }} className="px-2 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm rounded-md bg-brand text-brand-foreground hover:bg-brand/90 transition">
                      Book Now
                    </button>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

