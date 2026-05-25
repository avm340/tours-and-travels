import { MapPin } from "lucide-react";
import { useRef, useEffect } from "react";

const cities = [
  { name: "Mumbai",         trips: "320+", img: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=600&q=70" },
  { name: "Pune",           trips: "240+", img: "/cars/touritst%20spots/Gemini_Generated_Image_3ddyls3ddyls3ddy.jpg" },
  { name: "Nashik",         trips: "110+", img: "/cars/touritst%20spots/Gemini_Generated_Image_lclalrlclalrlcla.jpg" },
  { name: "Goa",            trips: "130+", img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=70" },
  { name: "Lonavala",       trips: "180+", img: "/cars/touritst%20spots/Gemini_Generated_Image_7926hc7926hc7926.jpg" },
  { name: "Shirdi",         trips: "150+", img: "/cars/touritst%20spots/Gemini_Generated_Image_wlyougwlyougwlyo.jpg" },
  { name: "Mahabaleshwar",  trips: "160+", img: "/cars/touritst%20spots/Gemini_Generated_Image_btfn7cbtfn7cbtfn.jpg" },
];

export function Cities() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let intervalId: any;
    let scrollDirection = 1;

    const startAutoScroll = () => {
      intervalId = setInterval(() => {
        const maxScroll = el.scrollWidth - el.clientWidth;
        if (maxScroll <= 0) return;

        // If close to the end, scroll back to start, else scroll right
        if (el.scrollLeft >= maxScroll - 10) {
          el.scrollTo({ left: 0, behavior: "smooth" });
          scrollDirection = 1;
        } else {
          el.scrollBy({
            left: 152, // card width (140px) + gap (12px)
            behavior: "smooth",
          });
        }
      }, 3500);
    };

    startAutoScroll();

    const handleInteraction = () => {
      clearInterval(intervalId);
      clearTimeout((el as any).resumeTimeout);
      (el as any).resumeTimeout = setTimeout(startAutoScroll, 6000);
    };

    el.addEventListener("touchstart", handleInteraction, { passive: true });
    el.addEventListener("mousedown", handleInteraction, { passive: true });

    return () => {
      clearInterval(intervalId);
      clearTimeout((el as any).resumeTimeout);
      el.removeEventListener("touchstart", handleInteraction);
      el.removeEventListener("mousedown", handleInteraction);
    };
  }, []);

  return (
    <section id="cities" className="py-12 sm:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-6 sm:mb-10">
          <h2 className="text-2xl sm:text-4xl font-bold text-navy">From Mumbai to Anywhere in India</h2>
          <p className="mt-2 sm:mt-3 text-sm sm:text-base text-muted-foreground">Book a cab to any of these popular destinations</p>
        </div>

        {/* Mobile: horizontal scroll carousel */}
        <div className="sm:hidden -mx-4 px-4">
          <div ref={scrollRef} className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide after:content-[''] after:w-1 after:shrink-0">
            {cities.map((c) => (
              <div key={c.name} className="snap-start shrink-0 w-[140px] rounded-xl overflow-hidden border bg-card group">
                <div className="aspect-square overflow-hidden">
                  <img src={c.img} alt={`Cab service to ${c.name} from Mumbai - Manasvi Tours`} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-2.5 text-center">
                  <h3 className="font-bold text-navy text-sm">{c.name}</h3>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{c.trips} trips/mo</p>
                </div>
              </div>
            ))}
            {/* Many More – mobile */}
            <div className="snap-start shrink-0 w-[140px] rounded-xl overflow-hidden border bg-gradient-to-br from-navy to-brand text-white flex flex-col items-center justify-center p-4 text-center gap-2">
              <MapPin className="h-7 w-7 opacity-80" />
              <p className="font-bold text-sm leading-tight">& Many More</p>
              <p className="text-[10px] opacity-70">Ask us for your city</p>
            </div>
          </div>
        </div>

        {/* Desktop: 4-col grid */}
        <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {cities.map((c) => (
            <div key={c.name} className="rounded-xl overflow-hidden border bg-card hover:shadow-xl transition group">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={c.img} alt={`Cab service to ${c.name} from Mumbai - Manasvi Tours`} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-navy">{c.name}</h3>
                <p className="text-sm text-muted-foreground mt-0.5">{c.trips} trips/month</p>
              </div>
            </div>
          ))}
          {/* Many More – desktop (8th card) */}
          <div className="rounded-xl border bg-gradient-to-br from-navy to-brand text-white flex flex-col items-center justify-center p-6 text-center gap-3 hover:shadow-xl transition hover:-translate-y-1">
            <MapPin className="h-10 w-10 opacity-80" />
            <h3 className="text-lg font-bold">& Many More</h3>
            <p className="text-sm text-white/70">Don't see your city? Ask us — we go anywhere!</p>
          </div>
        </div>
      </div>
    </section>
  );
}

