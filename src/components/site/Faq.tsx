import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "What is the best car rental service with driver?", a: "We provide reliable car rental services with professional drivers for local travel, airport transfers, outstation trips, corporate travel, and sightseeing tours. Our focus is on safety, comfort, punctuality, and affordable pricing." },
  { q: "Do you provide car rental services with driver only?", a: "Yes, we only offer chauffeur-driven car rental services. We do not provide self-drive cars. Our experienced drivers ensure a safe, comfortable, and stress-free travel experience." },
  { q: "Can I hire a car with driver for outstation trips?", a: "Yes, you can book our chauffeur-driven cars for one-way, round-trip, and multi-day outstation travel. We offer comfortable vehicles for family trips, business travel, and vacations." },
  { q: "Do you offer airport pickup and drop services?", a: "Yes, we provide 24/7 airport pickup and drop services with professional drivers and timely arrivals for a hassle-free journey." },
  { q: "How can I book a car rental with driver?", a: "You can easily book a car through our website, phone call, or WhatsApp. Our booking process is quick, simple, and convenient." },
  { q: "Do you provide local sightseeing tour packages?", a: "Yes, we offer customized local sightseeing and tour packages for families, couples, corporate groups, and tourists." },
  { q: "Can I book a car for corporate travel?", a: "Yes, we provide professional corporate car rental services for business meetings, employee transportation, airport transfers, and company events." },
  { q: "Is fuel included in the car rental package?", a: "Yes, fuel and driver charges are generally included in most packages unless specified otherwise during booking." },
  { q: "Do you provide luxury car rentals with driver?", a: "Yes, we offer luxury chauffeur-driven cars for weddings, VIP travel, business events, airport transfers, and special occasions." },
  { q: "Why choose our tours and travel services?", a: "We provide clean and well-maintained vehicles, professional drivers, affordable pricing, timely service, and customized travel solutions for every customer." },
  { q: "Is advance booking necessary for car rental services?", a: "Advance booking is recommended to ensure vehicle availability, especially during weekends, holidays, and peak travel seasons." },
  { q: "Are your vehicles sanitized and maintained regularly?", a: "Yes, all vehicles are regularly serviced, cleaned, and sanitized to provide a safe and comfortable travel experience." }
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const [showAll, setShowAll] = useState(false);
  
  const displayedFaqs = showAll ? faqs : faqs.slice(0, 8);

  return (
    <section className="py-12 sm:py-20 bg-soft">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-navy">Frequently Asked Questions</h2>
        </div>
        <div className="relative">
          <div className="space-y-3">
            {displayedFaqs.map((f, i) => (
              <div key={f.q} className={`bg-card border rounded-lg overflow-hidden ${i >= 8 ? "animate-fade-in" : ""}`}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-medium text-navy hover:bg-soft transition"
                >
                  <span className="pr-4">{f.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`}
                  />
                </button>
                {open === i && (
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-sm text-muted-foreground animate-fade-in">{f.a}</div>
                )}
              </div>
            ))}
          </div>
          {!showAll && faqs.length > 8 && (
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-soft to-transparent pointer-events-none z-10" />
          )}
        </div>
        {!showAll && faqs.length > 8 && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowAll(true)}
              className="px-6 py-2 rounded-md bg-navy text-navy-foreground font-medium hover:bg-navy/90 transition"
            >
              See More
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
