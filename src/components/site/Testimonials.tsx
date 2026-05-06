import { Star } from "lucide-react";

const reviews = [
  { name: "Rohan Sharma", city: "Mumbai", text: "Excellent service, clean car, on-time delivery! Will definitely book again with Manasvi." },
  { name: "Priya Deshmukh", city: "Pune", text: "Zero deposit and easy booking — highly recommend Manasvi! The Honda City was spotless." },
  { name: "Amit Patil", city: "Nashik", text: "Best self-drive experience in Pune. Smooth pickup, transparent pricing, and great support." },
];

export function Testimonials() {
  return (
    <section className="py-12 sm:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-4xl font-bold text-navy">What Our Customers Say</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {reviews.map((r) => (
            <div key={r.name} className="p-6 rounded-xl bg-card border hover:shadow-xl transition">
              <div className="flex gap-1 text-brand">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed">"{r.text}"</p>
              <div className="mt-5 pt-4 border-t">
                <p className="font-semibold text-navy">{r.name}</p>
                <p className="text-xs text-muted-foreground">{r.city}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
