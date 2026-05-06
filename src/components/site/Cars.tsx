import { useState } from "react";
import { Users, Fuel, Snowflake, MapPin } from "lucide-react";

type Car = {
  name: string;
  category: "Hatchback" | "Sedan" | "SUV" | "MUV" | "Luxury";
  seats: number;
  fuel: string;
  price: number;
  image: string;
};

const cars: Car[] = [
  { name: "Maruti Swift", category: "Hatchback", seats: 5, fuel: "Petrol", price: 999, image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=70" },
  { name: "Honda City", category: "Sedan", seats: 5, fuel: "Petrol", price: 1599, image: "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?auto=format&fit=crop&w=800&q=70" },
  { name: "Toyota Innova", category: "MUV", seats: 7, fuel: "Diesel", price: 2499, image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=800&q=70" },
  { name: "Mahindra Scorpio", category: "SUV", seats: 7, fuel: "Diesel", price: 2299, image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=70" },
  { name: "Toyota Fortuner", category: "Luxury", seats: 7, fuel: "Diesel", price: 4999, image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=70" },
  { name: "Maruti Ertiga", category: "MUV", seats: 7, fuel: "Petrol", price: 1799, image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=800&q=70" },
  { name: "Honda Amaze", category: "Sedan", seats: 5, fuel: "Petrol", price: 1399, image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=70" },
  { name: "Mahindra XUV500", category: "SUV", seats: 7, fuel: "Diesel", price: 2799, image: "https://images.unsplash.com/photo-1568844293986-8d0400bd4745?auto=format&fit=crop&w=800&q=70" },
];

const tabs = ["All", "Hatchback", "Sedan", "SUV", "MUV", "Luxury"] as const;

export function Cars() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("All");
  const filtered = tab === "All" ? cars : cars.filter((c) => c.category === tab);
  return (
    <section id="cars" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-navy">Choose Your Ride</h2>
          <p className="mt-3 text-muted-foreground">Pick from our range of well-maintained vehicles</p>
        </div>
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                tab === t
                  ? "bg-brand text-brand-foreground shadow-md shadow-brand/30"
                  : "bg-soft text-navy hover:bg-brand-light/30"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((c) => (
            <article
              key={c.name}
              className="group bg-card rounded-xl border overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="aspect-[4/3] bg-soft overflow-hidden relative">
                <img
                  src={c.image}
                  alt={c.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-brand-light/95 text-navy text-xs font-semibold px-2.5 py-1 rounded-full">
                  {c.category}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-navy text-lg">{c.name}</h3>
                <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{c.seats} Seater</span>
                  <span className="flex items-center gap-1"><Fuel className="h-3.5 w-3.5" />{c.fuel}</span>
                  <span className="flex items-center gap-1"><Snowflake className="h-3.5 w-3.5" />AC</span>
                  <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />GPS</span>
                </div>
                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">From</p>
                    <p className="text-xl font-bold text-brand">₹{c.price}<span className="text-xs font-normal text-muted-foreground">/day</span></p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <button className="px-3 py-2 text-sm rounded-md border border-brand text-brand hover:bg-brand/5 transition">
                    View Details
                  </button>
                  <button className="px-3 py-2 text-sm rounded-md bg-brand text-brand-foreground hover:bg-brand/90 transition">
                    Book Now
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10 text-center">
          <button className="px-7 py-3 rounded-md bg-navy text-navy-foreground font-medium hover:bg-navy/90 transition">
            View All Cars
          </button>
        </div>
      </div>
    </section>
  );
}
