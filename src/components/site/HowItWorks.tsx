import { Search, ClipboardCheck, CreditCard, Car } from "lucide-react";

const steps = [
  { icon: Search, title: "Search", desc: "Select trip type, city, dates & car" },
  { icon: ClipboardCheck, title: "Confirm", desc: "Review fare, choose car tier" },
  { icon: CreditCard, title: "Pay", desc: "Pay online or cash — no advance needed" },
  { icon: Car, title: "Travel", desc: "Driver arrives at your doorstep!" },
];

export function HowItWorks() {
  return (
    <section className="py-12 sm:py-20 bg-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-6 sm:mb-12">
          <h2 className="text-2xl sm:text-4xl font-bold text-navy">Book in 4 Simple Steps</h2>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="sm:hidden max-w-sm mx-auto">
          {steps.map((s, i) => (
            <div key={s.title} className="flex gap-4">
              {/* Timeline spine */}
              <div className="flex flex-col items-center">
                <div className="h-10 w-10 rounded-full bg-brand text-brand-foreground flex items-center justify-center shrink-0 shadow-lg shadow-brand/30 z-10">
                  <s.icon className="h-5 w-5" />
                </div>
                {i < steps.length - 1 && (
                  <div className="w-0.5 flex-1 bg-brand/20 my-1" />
                )}
              </div>
              {/* Content */}
              <div className={`pb-6 ${i === steps.length - 1 ? "" : ""}`}>
                <p className="text-[10px] font-bold text-brand tracking-wider">STEP {i + 1}</p>
                <h3 className="text-base font-bold text-navy leading-tight">{s.title}</h3>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: 4-col with connecting line */}
        <div className="hidden sm:block">
          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8 stagger-children">
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
      </div>
    </section>
  );
}
