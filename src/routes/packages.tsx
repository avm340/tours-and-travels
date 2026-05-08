import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";
import { Calendar, Check, ArrowRight, ChevronDown, MessageCircle } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/packages")({
  head: () => ({
    meta: [
      { title: "Maharashtra Tour Packages — Manasvi Tours and Travels" },
      {
        name: "description",
        content:
          "Curated tour packages across Maharashtra — Shirdi, Konkan, Ajanta-Ellora, Lonavala, Goa and more. Custom packages available.",
      },
      { property: "og:title", content: "Tour Packages — Manasvi Tours" },
      { property: "og:description", content: "Explore Maharashtra with curated tour packages." },
    ],
  }),
  component: PackagesPage,
});

type Cat = "All" | "Pilgrimage" | "Adventure" | "Family" | "Corporate" | "Honeymoon";

const packages: {
  name: string; cat: Exclude<Cat, "All">; days: string; route: string;
  car: string; price: string; img: string; highlights: string[];
}[] = [
  {
    name: "Shirdi Darshan",
    cat: "Pilgrimage", days: "1 Day", route: "Mumbai → Shirdi → Mumbai", car: "AC Sedan",
    price: "₹3,500/person",
    img: "https://images.unsplash.com/photo-1604608672516-f1b9b1d1f1d8?w=800&auto=format&fit=crop",
    highlights: ["Pickup & drop included", "Driver bata & toll covered", "VIP darshan assistance"],
  },
  {
    name: "Konkan Coast Drive",
    cat: "Adventure", days: "3 Days", route: "Alibaug · Ganpatipule · Ratnagiri", car: "SUV",
    price: "₹12,000/person",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop",
    highlights: ["Beach-side stays", "Local seafood experience", "Sunset photo stops"],
  },
  {
    name: "Ajanta-Ellora Heritage",
    cat: "Family", days: "2 Days", route: "Aurangabad", car: "AC Sedan/SUV",
    price: "₹8,500/person",
    img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop",
    highlights: ["UNESCO heritage caves", "Guided tour included", "Comfortable hotel stay"],
  },
  {
    name: "Lonavala-Mahabaleshwar Weekend",
    cat: "Honeymoon", days: "2 Days", route: "Pune → Lonavala → Mahabaleshwar", car: "AC Sedan",
    price: "₹6,000/person",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop",
    highlights: ["Strawberry farm visit", "Scenic viewpoints", "Couple-friendly stays"],
  },
  {
    name: "Goa Beach Trip",
    cat: "Family", days: "4 Days", route: "Pune → North & South Goa", car: "Innova",
    price: "₹14,000/person",
    img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&auto=format&fit=crop",
    highlights: ["Beach hopping itinerary", "Water sports add-on", "Hotel + breakfast"],
  },
  {
    name: "Corporate Day Outing",
    cat: "Corporate", days: "1 Day", route: "Customizable", car: "Tempo Traveller",
    price: "Get Quote",
    img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&auto=format&fit=crop",
    highlights: ["Team-building venues", "Bulk pricing", "Dedicated coordinator"],
  },
];

const categories: Cat[] = ["All", "Pilgrimage", "Adventure", "Family", "Corporate", "Honeymoon"];

function PackagesPage() {
  const [active, setActive] = useState<Cat>("All");
  const filtered = active === "All" ? packages : packages.filter((p) => p.cat === active);
  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <Navbar />
      <main>
        <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-20 bg-gradient-to-br from-navy via-navy to-near-black text-white overflow-hidden">
          <div className="pointer-events-none absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-brand-light/25 blur-3xl animate-blob" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <Reveal variant="up">
              <h1 className="text-3xl sm:text-5xl font-bold leading-tight">
                Explore Maharashtra with <span className="text-brand-light">Curated Tour Packages</span>
              </h1>
              <p className="mt-4 text-white/80 max-w-2xl">
                Hand-crafted itineraries — pilgrimage, adventure, family, corporate & honeymoon.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="py-12 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setActive(c)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    active === c ? "bg-brand text-brand-foreground" : "bg-soft text-foreground hover:bg-brand-light/20"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {filtered.map((p) => (
                <PackageCard key={p.name} p={p} />
              ))}
            </div>
          </div>
        </section>

        {/* Custom Package */}
        <section className="py-12 sm:py-20 bg-soft">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <Reveal variant="up">
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-4xl font-bold text-navy">Request a Custom Package</h2>
                <p className="mt-3 text-muted-foreground">Tell us your dream trip and we'll build it.</p>
              </div>
            </Reveal>
            <form
              onSubmit={(e) => { e.preventDefault(); alert("Thanks! We'll reach out within 24 hours."); }}
              className="bg-card border rounded-2xl p-5 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <Input label="Name" placeholder="Your full name" />
              <Input label="Phone" placeholder="+91 9876543210" />
              <Input label="From City" placeholder="Mumbai" />
              <Input label="Destination Idea" placeholder="Konkan / Goa / Open" />
              <Input label="No. of People" type="number" placeholder="4" />
              <Input label="Travel Date" type="date" />
              <button type="submit" className="sm:col-span-2 mt-2 bg-brand hover:bg-brand/90 text-brand-foreground rounded-lg font-semibold h-12 flex items-center justify-center gap-2 transition">
                <Send className="h-4 w-4" /> Submit Request
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function Input({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</span>
      <input
        {...rest}
        className="mt-1.5 w-full h-12 px-3 rounded-lg bg-soft border border-border focus:border-brand outline-none text-sm"
      />
    </label>
  );
}
