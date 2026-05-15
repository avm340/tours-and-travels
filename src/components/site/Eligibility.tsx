import { CheckCircle2 } from "lucide-react";

const items = [
  "Valid Indian ID proof: Aadhaar Card, PAN, or Voter ID",
  "Passenger details for group bookings (names, ages)",
  "Pickup address and contact number",
  "International tourists: Passport + valid Visa",
  "Special requirements (child seat, luggage space) — inform at booking",
  "Payment via UPI, card, net banking, or cash",
];

export function Eligibility() {
  return (
    <section className="py-12 sm:py-20 bg-soft">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-navy">What You Need to Book</h2>
          <p className="mt-3 text-muted-foreground">Quick checklist for a hassle-free journey</p>
        </div>
        <ul className="grid sm:grid-cols-2 gap-4">
          {items.map((i) => (
            <li
              key={i}
              className="flex items-start gap-3 p-4 rounded-lg bg-card border hover:border-brand transition"
            >
              <CheckCircle2 className="h-5 w-5 text-brand mt-0.5 shrink-0" />
              <span className="text-sm">{i}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
