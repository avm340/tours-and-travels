import { Search, FileCheck, CreditCard, Car } from "lucide-react";

const steps = [
  { icon: Search, title: "Search", desc: "Select city, dates, car type" },
  { icon: FileCheck, title: "Verify", desc: "Upload driving license + Aadhaar/Voter ID" },
  { icon: CreditCard, title: "Pay", desc: "Pay online or cash. Zero deposit required" },
  { icon: Car, title: "Drive", desc: "Car delivered to your doorstep. Enjoy!" },
];

export function HowItWorks() {
  return (
    <section className="py-20 bg-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-navy">Book Your Car in 4 Simple Steps</h2>
        </div>
        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-brand-light/40" />
          {steps.map((s, i) => (
            <div key={s.title} className="relative text-center">
              <div className="mx-auto h-20 w-20 rounded-full bg-brand text-brand-foreground flex items-center justify-center shadow-lg shadow-brand/30 relative z-10">
                <s.icon className="h-9 w-9" />
              </div>
              <p className="mt-2 text-xs font-semibold text-brand">STEP {i + 1}</p>
              <h3 className="mt-1 text-lg font-bold text-navy">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground max-w-[14rem] mx-auto">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
