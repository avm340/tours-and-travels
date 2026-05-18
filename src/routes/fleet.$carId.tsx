import { createFileRoute, Link } from "@tanstack/react-router";
import { carsData } from "@/data/cars";
import { Users, Fuel, Snowflake, CheckCircle2, ChevronRight, ChevronLeft, Phone, Info } from "lucide-react";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { useEffect, useState } from "react";
import { setPageMeta } from "@/lib/meta";
import { bookOnWhatsApp } from "@/lib/whatsapp";

export const Route = createFileRoute("/fleet/$carId")({
  component: CarDetail,
});

function CarDetail() {
  const { carId } = Route.useParams();
  const car = carsData.find((c) => c.id === carId);
  const [km, setKm] = useState(100);
  const [activeImg, setActiveImg] = useState(0);

  if (!car) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Car Not Found</h1>
          <Link to="/" className="text-brand hover:underline mt-4 block">Return Home</Link>
        </div>
      </div>
    );
  }

  useEffect(() => {
    if (car) {
      setPageMeta({
        title: `${car.name} Rental in Mumbai | Manasvi Tours`,
        description: `Rent the ${car.name} (${car.seats} seater) with a professional driver from Mumbai. Rate starts at ₹${car.pricePerKm}/km. ${car.description}`,
        url: `/fleet/${car.id}`,
        image: car.images[0]
      });
    }
  }, [car]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 pt-20">
        {/* Breadcrumb */}
        <div className="bg-soft border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center text-sm text-muted-foreground gap-2">
            <Link to="/" className="hover:text-brand">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-navy font-medium">{car.name}</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

            {/* Left: Image Carousel */}
            <div className="space-y-3">
              {/* Main image with prev/next */}
              <div className="relative h-[320px] sm:h-[460px] rounded-2xl overflow-hidden border bg-white group">
                <img
                  key={activeImg}
                  src={car.images[activeImg]}
                  alt={`${car.name} view ${activeImg + 1}`}
                  className="w-full h-full object-cover transition-opacity duration-300"
                />
                {car.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveImg((i) => (i - 1 + car.images.length) % car.images.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition opacity-0 group-hover:opacity-100"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setActiveImg((i) => (i + 1) % car.images.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition opacity-0 group-hover:opacity-100"
                      aria-label="Next image"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                    {/* Dot indicators */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {car.images.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveImg(i)}
                          className={`h-2 rounded-full transition-all ${i === activeImg ? "w-5 bg-white" : "w-2 bg-white/50 hover:bg-white/80"}`}
                          aria-label={`Go to image ${i + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
                {/* Image count badge */}
                <span className="absolute top-3 right-3 bg-black/50 text-white text-xs px-2.5 py-1 rounded-full">
                  {activeImg + 1} / {car.images.length}
                </span>
              </div>
              {/* Thumbnail strip */}
              {car.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                  {car.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImg(idx)}
                      className={`shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 transition ${
                        idx === activeImg ? "border-brand shadow-md" : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt={`thumb ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>


            {/* Right: Details */}
            <div className="space-y-8">
              <div>
                <span className="inline-block px-3 py-1 bg-brand-light/30 text-navy text-xs font-semibold rounded-full mb-3">
                  {car.category}
                </span>
                <h1 className="text-3xl sm:text-5xl font-bold text-navy">{car.name}</h1>
                <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
                  {car.description}
                </p>
              </div>

              {/* Pricing & Key Specs */}
              <div className="flex flex-wrap items-center gap-6 p-5 rounded-2xl bg-white border shadow-sm">
                <div>
                  <p className="text-sm text-muted-foreground">Outstation Rate</p>
                  <p className="text-3xl font-bold text-brand">₹{car.pricePerKm}<span className="text-sm text-muted-foreground font-normal">/km</span></p>
                </div>
                <div className="h-12 w-px bg-border hidden sm:block"></div>
                <div className="flex gap-4">
                  <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-soft">
                    <Users className="h-5 w-5 text-navy mb-1" />
                    <span className="text-xs font-medium">{car.seats} Seats</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-soft">
                    <Snowflake className="h-5 w-5 text-navy mb-1" />
                    <span className="text-xs font-medium">AC/Non-AC</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-soft">
                    <Fuel className="h-5 w-5 text-navy mb-1" />
                    <span className="text-xs font-medium">Included</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => bookOnWhatsApp({ car: car.name })}
                  className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-4 px-6 rounded-xl font-semibold hover:bg-[#20bd5a] transition shadow-lg"
                >
                  <WhatsAppIcon className="h-5 w-5" /> Book on WhatsApp
                </button>
                <a
                  href="tel:+919821790471"
                  className="flex items-center justify-center gap-2 bg-navy text-white py-4 px-6 rounded-xl font-semibold hover:bg-navy/90 transition shadow-lg"
                >
                  <Phone className="h-5 w-5" /> Call for Quote
                </a>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                By booking, you agree to our{" "}
                <a href="/tnc" className="text-brand underline hover:text-brand/80">Terms &amp; Conditions</a>.
              </p>

              {/* Quick Calculator */}

              <div className="bg-soft p-5 sm:p-6 rounded-2xl border shadow-sm">
                <h3 className="font-semibold text-navy mb-3">Calculate estimate for this car</h3>
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <div className="relative flex-1 w-full">
                    <input
                      type="number"
                      min="1"
                      value={km}
                      onChange={(e) => setKm(Number(e.target.value) || 0)}
                      className="w-full h-12 pl-4 pr-12 rounded-xl border border-border focus:border-brand outline-none text-sm"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-medium">KM</span>
                  </div>
                  <div className="flex-1 w-full flex items-center justify-between gap-3 bg-white h-12 px-4 rounded-xl border shadow-sm">
                    <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Est. Fare</span>
                    <span className="font-bold text-brand text-lg">₹{((km * car.pricePerKm) + 300).toLocaleString('en-IN')}</span>
                  </div>
                </div>
                <p className="mt-3.5 text-xs text-muted-foreground flex items-start sm:items-center gap-1.5">
                  <Info className="h-4 w-4 text-brand shrink-0 sm:mt-0 mt-0.5" />
                  <span>
                    <a href="https://wa.me/919821790471" target="_blank" rel="noreferrer" className="text-brand hover:underline font-medium">Contact us on WhatsApp</a> to get a discount!
                  </span>
                </p>
              </div>

              {/* Features & Best For */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 border-t pt-8">
                <div>
                  <h3 className="text-lg font-semibold text-navy mb-4">Luxury Features</h3>
                  <ul className="space-y-3">
                    {car.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-navy mb-4">Perfect For</h3>
                  <ul className="space-y-3">
                    {car.bestFor.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <div className="h-1.5 w-1.5 rounded-full bg-brand shrink-0 mt-1.5"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
