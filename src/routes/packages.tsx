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

        {/* Custom Package — WhatsApp Banner */}
        <section className="relative py-12 sm:py-20 bg-gradient-to-br from-navy via-navy to-near-black text-white overflow-hidden">
          <div className="pointer-events-none absolute -top-20 -right-20 w-96 h-96 rounded-full bg-brand-light/20 blur-3xl animate-blob" />
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
            <Reveal variant="up">
              <div className="text-center mb-8">
                <span className="inline-block px-3 py-1 rounded-full bg-brand-light/20 text-brand-light text-xs font-medium border border-brand-light/30 mb-3">
                  Custom Trip
                </span>
                <h2 className="text-2xl sm:text-4xl font-bold">
                  Can't find your destination? <span className="text-brand-light">Request a Custom Package</span>
                </h2>
                <p className="mt-3 text-white/80">Send us your trip idea on WhatsApp — we'll respond within 1 hour.</p>
              </div>
            </Reveal>
            <CustomPackageForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function CustomPackageForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Hi Manasvi Tours!%0A%0AName: ${name}%0AWhatsApp: ${phone}%0ADestination: ${destination}%0ADate: ${date}%0A%0APlease share a custom package quote.`
    );
    window.open(`https://wa.me/919876543210?text=${msg}`, "_blank");
  };
  return (
    <form
      onSubmit={submit}
      className="bg-white/10 border border-white/20 backdrop-blur-sm rounded-2xl p-5 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-4"
    >
      <Input label="Name" placeholder="Your full name" value={name} onChange={(e) => setName(e.target.value)} required />
      <Input label="WhatsApp Number" placeholder="+91 9876543210" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
      <Input label="Destination" placeholder="Konkan / Goa / Open" value={destination} onChange={(e) => setDestination(e.target.value)} required />
      <Input label="Travel Date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      <button
        type="submit"
        className="sm:col-span-2 mt-2 bg-[#25D366] hover:bg-[#1FB955] text-white rounded-lg font-semibold h-12 flex items-center justify-center gap-2 transition"
      >
        <MessageCircle className="h-4 w-4" /> Send on WhatsApp
      </button>
    </form>
  );
}

function Input({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-white/80 uppercase tracking-wide">{label}</span>
      <input
        {...rest}
        className="mt-1.5 w-full h-12 px-3 rounded-lg bg-white/10 border border-white/30 placeholder:text-white/50 focus:border-brand-light outline-none text-sm text-white"
      />
    </label>
  );
}

type Pkg = {
  name: string; cat: string; days: string; route: string;
  car: string; price: string; img: string; highlights: string[];
};

function PackageCard({ p }: { p: Pkg }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl bg-card border overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all flex flex-col">
      <div className="relative h-56 overflow-hidden">
        <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-near-black/85 via-near-black/30 to-transparent" />
        <span className="absolute top-3 left-3 bg-brand text-brand-foreground text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
          <Calendar className="h-3 w-3" /> {p.days}
        </span>
        <span className="absolute top-3 right-3 bg-white/15 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full border border-white/30">
          {p.cat}
        </span>
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="text-xl font-bold leading-tight">{p.name}</h3>
          <p className="text-xs text-white/85 mt-1">{p.route}</p>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">{p.car}</p>
          <p className="text-lg font-bold text-brand">{p.price}</p>
        </div>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="mt-4 flex items-center justify-between w-full text-sm font-medium text-navy py-2 border-t border-border"
        >
          What's Included
          <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
        <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-60" : "max-h-0"}`}>
          <ul className="pt-2 pb-1 space-y-1.5 text-sm">
            {p.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2">
                <Check className="h-4 w-4 text-brand mt-0.5 shrink-0" /> {h}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button className="py-2 rounded-md border border-navy text-navy text-sm font-medium hover:bg-navy hover:text-navy-foreground transition">View Itinerary</button>
          <button className="py-2 rounded-md bg-brand text-brand-foreground text-sm font-medium hover:bg-brand/90 transition flex items-center justify-center gap-1">
            Book Now <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
