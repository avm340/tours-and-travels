import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";
import { Calendar, Check, X, ArrowRight, ChevronDown, MapPin, Users, Star, Phone, Car, UserCheck, Fuel, ShieldAlert, Ticket, Hotel, Utensils, BadgeCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { setPageMeta } from "@/lib/meta";
import { bookOnWhatsApp } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";

export const Route = createFileRoute("/packages")({
  component: PackagesPage,
});

/* ── Types ── */
type Cat = "All" | "Weekend Getaways" | "Pilgrimages" | "Hill Stations" | "Beaches";
const CATEGORIES: Cat[] = ["All", "Weekend Getaways", "Pilgrimages", "Hill Stations", "Beaches"];

type Pkg = {
  name: string;
  cat: Exclude<Cat, "All">;
  duration: string;
  from: string;
  price: string;
  priceLabel: string;
  img: string;
  highlights: string[];
  itinerary: { day: string; plan: string }[];
};

/* ── Package Data with Real Images ── */
const PACKAGES: Pkg[] = [
  {
    name: "Weekend Goa Escape",
    cat: "Weekend Getaways",
    duration: "2 Days / 1 Night",
    from: "From Mumbai",
    price: "₹8,200",
    priceLabel: "per car",
    img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&h=400&fit=crop&q=80",
    highlights: [
      "North Goa beaches — Calangute, Baga, Anjuna",
      "Fort Aguada & Chapora Fort visits",
      "Scenic NH66 coastal highway drive",
    ],
    itinerary: [
      { day: "Day 1", plan: "Early morning pickup from Mumbai (5 AM). Drive to Goa via NH66 (~9 hrs). Check-in at hotel. Evening at Calangute/Baga Beach. Dinner at beachside shack." },
      { day: "Day 2", plan: "Morning visit Fort Aguada & Anjuna Flea Market. Lunch. Depart for Mumbai by 2 PM. Arrive late evening." },
    ],
  },
  {
    name: "Shirdi Darshan",
    cat: "Pilgrimages",
    duration: "1 Day",
    from: "From Mumbai",
    price: "₹3,300",
    priceLabel: "per car",
    img: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&h=400&fit=crop&q=80",
    highlights: [
      "Sai Baba Temple darshan",
      "Dwarkamai & Chavadi visit",
      "Same-day comfortable return",
    ],
    itinerary: [
      { day: "Day 1", plan: "4 AM pickup from Mumbai. Reach Shirdi by 8:30 AM. Sai Baba Temple darshan, Dwarkamai, Chavadi, and Sai Heritage Village. Lunch break. Depart by 3 PM. Reach Mumbai ~7:30 PM." },
    ],
  },
  {
    name: "Mahabaleshwar Retreat",
    cat: "Hill Stations",
    duration: "2 Days / 1 Night",
    from: "From Mumbai",
    price: "₹5,500",
    priceLabel: "per car",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=400&fit=crop&q=80",
    highlights: [
      "Arthur's Seat & Wilson Point sunrise",
      "Venna Lake boating & Mapro Garden",
      "Strawberry farm experience",
    ],
    itinerary: [
      { day: "Day 1", plan: "Morning pickup from Mumbai. Drive to Mahabaleshwar (5 hrs). Visit Elephant's Head Point, Venna Lake, Mapro Garden. Evening at leisure. Overnight stay." },
      { day: "Day 2", plan: "Early Wilson Point sunrise. Visit Arthur's Seat, Kate's Point, Lingmala Waterfall, strawberry farm. Lunch. Return to Mumbai by evening." },
    ],
  },
  {
    name: "Lonavala Chill",
    cat: "Hill Stations",
    duration: "1 Day",
    from: "From Mumbai",
    price: "₹2,100",
    priceLabel: "per car",
    img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=400&fit=crop&q=80",
    highlights: [
      "Tiger Point & Bhushi Dam",
      "Rajmachi Point panoramic views",
      "Chikki shopping at Lonavala Market",
    ],
    itinerary: [
      { day: "Day 1", plan: "Morning pickup from Mumbai. Drive to Lonavala (1.5 hrs). Visit Tiger Point, Bhushi Dam, Rajmachi Point, Lion's Point. Lunch. Shopping for chikki. Return to Mumbai by evening." },
    ],
  },
  {
    name: "Nashik Wine Tour",
    cat: "Weekend Getaways",
    duration: "1 Day",
    from: "From Mumbai",
    price: "₹2,800",
    priceLabel: "per car",
    img: "https://images.unsplash.com/photo-1474722883778-792e7990302f?w=600&h=400&fit=crop&q=80",
    highlights: [
      "Sula Vineyards wine tasting",
      "York & Soma vineyard visits",
      "Pandavleni Caves heritage stop",
    ],
    itinerary: [
      { day: "Day 1", plan: "Morning pickup from Mumbai. Drive to Nashik (3 hrs). Visit Sula Vineyards — wine tasting & tour. Lunch at Soma Vine Village. York Winery. Optional Pandavleni Caves. Return by evening." },
    ],
  },
  {
    name: "Alibaug Beach Day",
    cat: "Beaches",
    duration: "1 Day",
    from: "From Mumbai",
    price: "₹1,900",
    priceLabel: "per car",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop&q=80",
    highlights: [
      "Alibaug Beach & Kolaba Fort",
      "Nagaon Beach watersports",
      "Quick day trip — back by dinner",
    ],
    itinerary: [
      { day: "Day 1", plan: "Morning pickup from Mumbai. Drive to Alibaug (2.5 hrs). Alibaug Beach, walk to Kolaba Fort (low tide). Lunch at beachside restaurant. Nagaon Beach — optional watersports. Return by 7 PM." },
    ],
  },
];

/* ── Testimonials ── */
const REVIEWS = [
  { name: "Priya Sharma", dest: "Goa Trip", stars: 5, text: "Amazing experience! Driver was on time, car was spotless. The Goa trip was perfectly planned." },
  { name: "Rahul Patil", dest: "Shirdi Darshan", stars: 5, text: "Very smooth ride to Shirdi and back. No hidden charges at all. Will definitely book again!" },
  { name: "Sneha Kulkarni", dest: "Mahabaleshwar", stars: 4, text: "Loved the Mahabaleshwar trip with family. Driver knew all the best viewpoints. Great value for money." },
];

function PackagesPage() {
  const [active, setActive] = useState<Cat>("All");
  const filtered = active === "All" ? PACKAGES : PACKAGES.filter(p => p.cat === active);

  useEffect(() => {
    setPageMeta({
      title: "Tour Packages from Mumbai — Fixed Price | Manasvi Tours",
      description: "Curated tour packages from Mumbai — Goa, Shirdi, Mahabaleshwar, Lonavala, Nashik & more. Fixed price, all-inclusive cab service.",
      url: "/packages",
    });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* ═══════════════════ HERO ═══════════════════ */}
        <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 bg-gradient-to-br from-navy via-navy to-near-black text-white overflow-hidden">
          <div className="pointer-events-none absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-brand-light/25 blur-3xl animate-blob" />
          <div className="pointer-events-none absolute -top-10 -left-10 w-60 h-60 rounded-full bg-brand/20 blur-3xl animate-blob" style={{ animationDelay: "-4s" }} />

          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <Reveal variant="up">
              <div className="max-w-3xl">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
                  Curated Trips. <span className="text-brand-light">Fixed Price. Zero Hassle.</span>
                </h1>
                <p className="mt-4 text-white/75 max-w-xl text-base sm:text-lg">
                  Everything included — cab, driver, itinerary. Just show up and enjoy.
                </p>
              </div>
            </Reveal>

            {/* Filter Tabs */}
            <div className="mt-8 flex flex-wrap gap-2">
              {CATEGORIES.map(c => (
                <button
                  key={c}
                  onClick={() => setActive(c)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition ${
                    active === c
                      ? "bg-brand text-white shadow-lg shadow-brand/30"
                      : "bg-white/10 text-white/80 border border-white/20 hover:bg-white/20"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { value: "6+", label: "Curated Packages" },
                { value: "12,000+", label: "Happy Travellers" },
                { value: "4.8★", label: "Average Rating" },
                { value: "24/7", label: "On-Trip Support" },
              ].map(s => (
                <div key={s.label} className="rounded-xl bg-white/8 border border-white/15 backdrop-blur-sm px-4 py-3 text-center">
                  <p className="text-xl sm:text-2xl font-bold text-white">{s.value}</p>
                  <p className="text-[11px] text-white/60 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════ PACKAGE CARDS ═══════════════════ */}
        <section className="py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(p => (
                <PackageCard key={p.name} p={p} />
              ))}
            </div>
            {filtered.length === 0 && (
              <div className="text-center py-20">
                <p className="text-3xl">🗺️</p>
                <p className="mt-4 text-xl font-bold text-navy">No packages in this category</p>
                <p className="mt-2 text-muted-foreground">Request a custom package below!</p>
              </div>
            )}
          </div>
        </section>

        {/* ═══════════════════ WHAT'S ALWAYS INCLUDED ═══════════════════ */}
        <section className="py-16 sm:py-24 bg-soft border-y border-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <Reveal variant="up">
              <div className="text-center mb-12">
                <span className="inline-block px-3 py-1 rounded-full bg-brand/10 text-brand text-[10px] font-black uppercase tracking-wider mb-4">
                  Transparent Pricing
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-navy tracking-tight">What's Always Included</h2>
                <p className="mt-3 text-muted-foreground">We handle the drive, so you can enjoy the ride.</p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {/* Included Card */}
              <div className="bg-card border rounded-[2rem] p-6 sm:p-10 shadow-xl shadow-brand/5 relative overflow-hidden group">
                <div className="absolute -top-10 -right-10 p-6 opacity-5 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-12">
                  <BadgeCheck className="w-64 h-64 text-brand" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-xl sm:text-2xl font-bold text-navy flex items-center gap-3 border-b border-border/60 pb-5 mb-6">
                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 shadow-sm">
                      <Check className="h-5 w-5" />
                    </span>
                    Included in your fare
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { text: "AC Cab", icon: <Car className="h-5 w-5 text-brand" /> },
                      { text: "Professional Driver", icon: <UserCheck className="h-5 w-5 text-brand" /> },
                      { text: "Fuel Charges", icon: <Fuel className="h-5 w-5 text-brand" /> },
                      { text: "Tolls & Parking", icon: <ShieldAlert className="h-5 w-5 text-brand" /> },
                    ].map(item => (
                      <div key={item.text} className="flex items-center gap-4 p-4 rounded-2xl bg-muted/50 border border-border/50 hover:bg-muted transition-colors">
                        <div className="bg-background p-2.5 rounded-xl shadow-sm border border-border/50">
                          {item.icon}
                        </div>
                        <span className="font-semibold text-navy text-sm">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Not Included Card */}
              <div className="bg-card border border-red-100 dark:border-red-900/30 rounded-[2rem] p-6 sm:p-10 shadow-lg relative overflow-hidden group">
                <div className="absolute -top-10 -right-10 p-6 opacity-[0.03] transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-12">
                  <X className="w-64 h-64 text-red-500" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-xl sm:text-2xl font-bold text-navy flex items-center gap-3 border-b border-red-100 dark:border-red-900/30 pb-5 mb-6">
                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/40 text-red-500 dark:text-red-400 shadow-sm">
                      <X className="h-5 w-5" />
                    </span>
                    Not included
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    {[
                      { text: "Hotel Accommodation", icon: <Hotel className="h-5 w-5 text-red-400" />, desc: "Book a hotel of your choice" },
                      { text: "Meals & Food", icon: <Utensils className="h-5 w-5 text-red-400" />, desc: "Stop anywhere you like for meals" },
                      { text: "Entry Tickets & Guide", icon: <Ticket className="h-5 w-5 text-red-400" />, desc: "Direct payment at monuments/parks" },
                    ].map(item => (
                      <div key={item.text} className="flex items-center gap-4 p-4 rounded-2xl bg-red-50/50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                        <div className="bg-background p-2.5 rounded-xl shadow-sm border border-red-100 dark:border-red-900/30 shrink-0">
                          {item.icon}
                        </div>
                        <div>
                          <span className="font-semibold text-navy text-sm block">{item.text}</span>
                          <span className="text-xs text-muted-foreground mt-0.5 block">{item.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════ CUSTOM PACKAGE BUILDER ═══════════════════ */}
        <section className="py-16 sm:py-24 bg-gradient-to-br from-navy via-navy to-near-black text-white overflow-hidden relative">
          <div className="pointer-events-none absolute -top-20 -right-20 w-96 h-96 rounded-full bg-brand-light/20 blur-3xl animate-blob" />
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
            <Reveal variant="up">
              <div className="text-center mb-10">
                <span className="inline-block px-3 py-1 rounded-full bg-brand-light/20 text-brand-light text-xs font-medium border border-brand-light/30 mb-4">
                  Custom Trip
                </span>
                <h2 className="text-2xl sm:text-4xl font-bold">
                  Can't find your dream trip? <span className="text-brand-light">We'll build it for you.</span>
                </h2>
                <p className="mt-3 text-white/75 max-w-lg mx-auto">
                  Tell us where, when, and how many — we'll craft a custom package and respond within 1 hour.
                </p>
              </div>
            </Reveal>
            <CustomPackageForm />
          </div>
        </section>

        {/* ═══════════════════ TESTIMONIALS ═══════════════════ */}
        <section className="py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <Reveal variant="up">
              <div className="text-center mb-12">
                <h2 className="text-2xl sm:text-4xl font-bold text-navy">What Our Travellers Say</h2>
                <p className="mt-3 text-muted-foreground">Real reviews from real trips</p>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {REVIEWS.map(r => (
                <div key={r.name} className="rounded-2xl bg-card border p-6 hover:-translate-y-1 hover:shadow-lg transition-all">
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: r.stars }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                    {Array.from({ length: 5 - r.stars }).map((_, i) => (
                      <Star key={`e${i}`} className="h-4 w-4 text-muted" />
                    ))}
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">"{r.text}"</p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand to-brand-light text-white flex items-center justify-center font-bold text-sm">
                      {r.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-navy">{r.name}</p>
                      <p className="text-xs text-muted-foreground">{r.dest}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

/* ═══════════════════ PACKAGE CARD ═══════════════════ */
function PackageCard({ p }: { p: Pkg }) {
  const [showItinerary, setShowItinerary] = useState(false);

  return (
    <div className="group rounded-2xl bg-card border overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col">
      {/* Image Header */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={p.img}
          alt={p.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
          width={600}
          height={400}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="bg-brand text-white text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
            <Calendar className="h-3 w-3" /> {p.duration}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="bg-white/20 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-1 rounded-full border border-white/30">
            {p.cat}
          </span>
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="text-xl font-bold text-white leading-tight drop-shadow-lg">{p.name}</h3>
          <p className="text-xs text-white/85 mt-1 flex items-center gap-1">
            <MapPin className="h-3 w-3" /> {p.from}
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        {/* Price row */}
        <div className="flex items-end justify-between pb-4 border-b border-border">
          <div>
            <p className="text-3xl font-extrabold text-brand tracking-tight">{p.price}</p>
            <p className="text-[11px] text-muted-foreground font-medium">{p.priceLabel}</p>
          </div>
          <div className="flex flex-wrap gap-1">
            {["cab", "driver", "fuel", "tolls"].map(i => (
              <span key={i} className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 text-[9px] font-bold uppercase">
                ✓ {i}
              </span>
            ))}
          </div>
        </div>

        {/* Highlights */}
        <ul className="mt-4 space-y-2 flex-1">
          {p.highlights.map(h => (
            <li key={h} className="flex items-start gap-2 text-sm text-foreground">
              <Check className="h-4 w-4 text-brand mt-0.5 shrink-0" /> {h}
            </li>
          ))}
        </ul>

        {/* Itinerary Accordion */}
        <button
          type="button"
          onClick={() => setShowItinerary(!showItinerary)}
          className="mt-4 flex items-center justify-between w-full text-sm font-bold text-navy py-3 border-t border-border hover:text-brand transition-colors"
        >
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-brand" /> View Itinerary
          </span>
          <ChevronDown className={`h-4 w-4 text-brand transition-transform duration-300 ${showItinerary ? "rotate-180" : ""}`} />
        </button>
        <div className={`overflow-hidden transition-all duration-400 ${showItinerary ? "max-h-[500px]" : "max-h-0"}`}>
          <div className="space-y-3 pt-2 pb-3">
            {p.itinerary.map(d => (
              <div key={d.day} className="relative pl-6 border-l-2 border-brand/30">
                <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-brand ring-2 ring-card" />
                <p className="text-[11px] font-black text-brand uppercase tracking-wide">{d.day}</p>
                <p className="text-xs text-muted-foreground leading-relaxed mt-1">{d.plan}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={() => bookOnWhatsApp({ package: p.name })}
          className="mt-3 w-full py-3 rounded-xl bg-brand text-brand-foreground text-sm font-bold hover:bg-brand/90 transition flex items-center justify-center gap-2 shadow-lg shadow-brand/25 group-hover:shadow-xl group-hover:shadow-brand/30"
        >
          <WhatsAppIcon className="h-4 w-4" /> Book This Package <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════ CUSTOM PACKAGE FORM ═══════════════════ */
function CustomPackageForm() {
  const [destination, setDestination] = useState("");
  const [dates, setDates] = useState("");
  const [groupSize, setGroupSize] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hi Manasvi Tours! I'd like a custom tour package.\n\nDestination: ${destination}\nDates: ${dates}\nGroup Size: ${groupSize}\n\nPlease share an itinerary & quote.`;
    window.open(`https://wa.me/919821790471?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <form onSubmit={submit} className="bg-white/8 border border-white/15 backdrop-blur-sm rounded-2xl p-6 sm:p-8">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <label className="block">
          <span className="text-xs font-bold text-white/80 uppercase tracking-wide">Destination</span>
          <input
            className="mt-1.5 w-full h-12 px-4 rounded-xl bg-white/10 border border-white/25 placeholder:text-white/40 focus:border-brand-light focus:bg-white/15 outline-none text-sm text-white transition"
            placeholder="e.g. Kerala, Rajasthan..."
            value={destination}
            onChange={e => setDestination(e.target.value)}
            required
          />
        </label>
        <label className="block">
          <span className="text-xs font-bold text-white/80 uppercase tracking-wide">Travel Dates</span>
          <input
            className="mt-1.5 w-full h-12 px-4 rounded-xl bg-white/10 border border-white/25 placeholder:text-white/40 focus:border-brand-light focus:bg-white/15 outline-none text-sm text-white transition"
            type="date"
            value={dates}
            onChange={e => setDates(e.target.value)}
            required
          />
        </label>
        <label className="block">
          <span className="text-xs font-bold text-white/80 uppercase tracking-wide">Group Size</span>
          <input
            className="mt-1.5 w-full h-12 px-4 rounded-xl bg-white/10 border border-white/25 placeholder:text-white/40 focus:border-brand-light focus:bg-white/15 outline-none text-sm text-white transition"
            type="number"
            min={1}
            placeholder="e.g. 4 people"
            value={groupSize}
            onChange={e => setGroupSize(e.target.value)}
            required
          />
        </label>
      </div>
      <button
        type="submit"
        className="mt-5 w-full bg-[#25D366] hover:bg-[#1FB955] text-white rounded-xl font-bold h-13 py-3 flex items-center justify-center gap-2 transition shadow-lg shadow-[#25D366]/25 hover:shadow-xl"
      >
        <WhatsAppIcon className="h-5 w-5" /> Build My Custom Package <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  );
}
