import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "Is a deposit required?", a: "No, we offer a zero-deposit policy on all our bookings." },
  { q: "Can I drive outstation?", a: "Yes, you can drive anywhere in India with unlimited kilometres on outstation plans." },
  { q: "What documents do I need?", a: "A valid Indian driving license plus an ID proof (Aadhaar Card or Voter ID)." },
  { q: "Is fuel included in the rental?", a: "No, fuel is not included. The car must be returned with the same fuel level as pickup." },
  { q: "Can foreigners rent a car?", a: "Yes, international tourists can rent with a valid Passport and an International Driving Permit (IDP)." },
  { q: "How do I extend my booking?", a: "Just call or WhatsApp our 24/7 support team and we'll extend your booking instantly." },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-20 bg-soft">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-navy">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={f.q} className="bg-card border rounded-lg overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left font-medium text-navy hover:bg-soft transition"
              >
                <span>{f.q}</span>
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${open === i ? "rotate-180" : ""}`}
                />
              </button>
              {open === i && (
                <div className="px-5 pb-5 text-sm text-muted-foreground animate-fade-in">{f.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
