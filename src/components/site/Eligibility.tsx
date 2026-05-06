import { CheckCircle2 } from "lucide-react";

const items = [
  "Minimum age: 21 years",
  "Valid Indian driving license (held for 1+ year)",
  "ID proof: Aadhaar Card or Voter ID",
  "International tourists: Passport + IDP (International Driving Permit)",
  "Fuel not included — return with same fuel level",
  "Challans and traffic fines to be paid by renter",
];

export function Eligibility() {
  return (
    <section className="py-20 bg-soft">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-navy">What You Need to Book</h2>
          <p className="mt-3 text-muted-foreground">Quick eligibility checklist for hassle-free rentals</p>
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
