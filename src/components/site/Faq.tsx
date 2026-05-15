import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "How do I book an outstation cab?", a: "Simply select your route, date, and car type on our website. You'll receive instant confirmation on WhatsApp and SMS." },
  { q: "Can I book a cab for outstation trips?", a: "Yes, we offer outstation cabs across Maharashtra and beyond — Mumbai to Pune, Shirdi, Nashik, Goa, and many more routes." },
  { q: "What documents do I need?", a: "Just a valid ID proof (Aadhaar Card, PAN, or Voter ID) and a contact number. International tourists need a valid Passport." },
  { q: "Are toll and parking charges included?", a: "Toll and parking charges are extra and vary by route. Your driver will provide receipts for all additional charges." },
  { q: "Can I modify or cancel my booking?", a: "Yes, you can modify or cancel up to 24 hours before pickup for free. Just call or WhatsApp our 24/7 support team." },
  { q: "How do I extend my booking?", a: "Just call or WhatsApp our 24/7 support team and we'll extend your booking instantly." },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-12 sm:py-20 bg-soft">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-navy">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={f.q} className="bg-card border rounded-lg overflow-hidden">
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
      </div>
    </section>
  );
}
