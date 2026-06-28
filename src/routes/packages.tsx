import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";
import { Calendar, Check, ArrowRight, ChevronDown, MessageCircle, MapPin, Clock, Users, Star, Phone, Shield, X } from "lucide-react";
import { useState, useEffect } from "react";
import { setPageMeta } from "@/lib/meta";
import { bookOnWhatsApp } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";

export const Route = createFileRoute("/packages")({
  component: PackagesPage,
});

type Cat = "All" | "Pilgrimage" | "Hill Station" | "Beach" | "Heritage" | "Corporate";

const categories: Cat[] = ["All", "Pilgrimage", "Hill Station", "Beach", "Heritage", "Corporate"];

type Package = {
  name: string;
  cat: Exclude<Cat, "All">;
  days: string;
  nights: string;
  route: string;
  car: string;
  price: string;
  priceNote: string;
  gradient: string;
  emoji: string;
  highlights: string[];
  itinerary: { day: string; title: string; details: string }[];
  inclusions: string[];
  exclusions: string[];
};

const packages: Package[] = [
  {
    name: "Shirdi Sai Darshan",
    cat: "Pilgrimage",
    days: "1 Day",
    nights: "0 Nights",
    route: "Mumbai → Shirdi → Mumbai",
    car: "AC Sedan / SUV",
    price: "₹3,500",
    priceNote: "per person (min 2 pax)",
    gradient: "from-amber-500 to-orange-600",
    emoji: "🙏",
    highlights: ["Same-day return trip", "VIP darshan assistance", "Driver bata & toll included"],
    itinerary: [
      { day: "Day 1", title: "Mumbai → Shirdi → Mumbai", details: "Early morning 4 AM pickup from Mumbai. Reach Shirdi by 8:30 AM. Sai Baba temple darshan, Dwarkamai, Chavadi visit. Lunch break. Depart Shirdi by 3 PM. Reach Mumbai by 7:30 PM." },
    ],
    inclusions: ["AC car with driver", "Fuel charges", "Driver bata & allowances", "Toll & parking", "Pickup & drop from your doorstep"],
    exclusions: ["Meals & snacks", "Personal expenses", "VIP darshan ticket (if opted)", "GST (5%)"],
  },
  {
    name: "Lonavala-Khandala Getaway",
    cat: "Hill Station",
    days: "2 Days",
    nights: "1 Night",
    route: "Mumbai → Lonavala → Khandala → Mumbai",
    car: "AC Sedan / SUV",
    price: "₹5,500",
    priceNote: "per person (min 2 pax)",
    gradient: "from-green-500 to-emerald-600",
    emoji: "🏔️",
    highlights: ["Weekend-perfect getaway", "All sightseeing covered", "Hotel recommendations provided"],
    itinerary: [
      { day: "Day 1", title: "Mumbai → Lonavala", details: "Morning pickup from Mumbai. Drive to Lonavala (2 hrs). Visit Tiger Point, Bhushi Dam, Rajmachi Point. Evening leisure at hotel. Explore Lonavala market for chikki shopping." },
      { day: "Day 2", title: "Khandala → Mumbai", details: "After breakfast, visit Duke's Nose, Kune Waterfalls, and Karla Caves. Lunch break. Drive back to Mumbai by evening." },
    ],
    inclusions: ["AC car with driver", "Fuel charges", "Driver bata & allowances", "Toll & parking", "All sightseeing transfers"],
    exclusions: ["Hotel stay", "Meals", "Entry tickets", "Personal expenses", "GST (5%)"],
  },
  {
    name: "Mahabaleshwar Hill Trip",
    cat: "Hill Station",
    days: "3 Days",
    nights: "2 Nights",
    route: "Mumbai → Panchgani → Mahabaleshwar → Mumbai",
    car: "AC Sedan / Innova",
    price: "₹8,000",
    priceNote: "per person (min 2 pax)",
    gradient: "from-teal-500 to-cyan-600",
    emoji: "🍓",
    highlights: ["Strawberry farm visit", "Boat ride at Venna Lake", "Panoramic viewpoints"],
    itinerary: [
      { day: "Day 1", title: "Mumbai → Panchgani", details: "Morning pickup. Drive to Panchgani (5 hrs). Visit Table Land (Asia's longest plateau), Sydney Point, Parsi Point. Check-in at hotel. Evening walk at Panchgani market." },
      { day: "Day 2", title: "Mahabaleshwar Sightseeing", details: "Full day Mahabaleshwar: Arthur's Seat, Wilson Point (sunrise), Elephant's Head Point, Venna Lake boating, Mapro Garden, Strawberry farms. Evening leisure." },
      { day: "Day 3", title: "Mahabaleshwar → Mumbai", details: "After breakfast, visit Pratapgarh Fort (optional). Depart for Mumbai. Arrive by evening." },
    ],
    inclusions: ["AC car with driver for all 3 days", "Fuel charges", "Driver bata & night halt", "Toll & parking", "All sightseeing transfers"],
    exclusions: ["Hotel accommodation", "Meals", "Boating & entry tickets", "Personal expenses", "GST (5%)"],
  },
  {
    name: "Goa Beach Holiday",
    cat: "Beach",
    days: "4 Days",
    nights: "3 Nights",
    route: "Mumbai → North Goa → South Goa → Mumbai",
    car: "Innova / Urbania",
    price: "₹12,000",
    priceNote: "per person (min 4 pax)",
    gradient: "from-blue-500 to-indigo-600",
    emoji: "🏖️",
    highlights: ["North & South Goa covered", "Beach hopping itinerary", "Water sports optional add-on"],
    itinerary: [
      { day: "Day 1", title: "Mumbai → Goa", details: "Early morning departure from Mumbai. Scenic drive via NH66 (9-10 hrs). Arrive Goa by evening. Check-in at hotel. Relax at Calangute/Baga beach. Dinner at beachside shack." },
      { day: "Day 2", title: "North Goa", details: "Fort Aguada, Sinquerim Beach, Anjuna Flea Market, Vagator Beach & Chapora Fort. Evening at Tito's Lane, Baga. Optional water sports: parasailing, jet ski, banana boat." },
      { day: "Day 3", title: "South Goa", details: "Basilica of Bom Jesus (UNESCO), Se Cathedral, Mangueshi Temple. Afternoon at Colva Beach & Palolem Beach. Sunset cruise on Mandovi River (optional)." },
      { day: "Day 4", title: "Goa → Mumbai", details: "After breakfast, leisure time for shopping (Mapusa Market / Panaji). Depart for Mumbai by noon. Arrive Mumbai by late evening." },
    ],
    inclusions: ["AC car with driver for all 4 days", "Fuel charges", "Driver bata & night halts", "Toll & parking", "All sightseeing transfers", "Airport/railway station pickup if needed"],
    exclusions: ["Hotel accommodation", "Meals", "Water sports & activities", "Entry tickets", "Personal expenses", "GST (5%)"],
  },
  {
    name: "Ajanta-Ellora Heritage",
    cat: "Heritage",
    days: "3 Days",
    nights: "2 Nights",
    route: "Mumbai → Aurangabad → Ajanta → Ellora → Mumbai",
    car: "AC Sedan / SUV",
    price: "₹9,500",
    priceNote: "per person (min 2 pax)",
    gradient: "from-yellow-600 to-amber-700",
    emoji: "🏛️",
    highlights: ["Two UNESCO World Heritage Sites", "Expert local guides available", "Comfortable Aurangabad stay"],
    itinerary: [
      { day: "Day 1", title: "Mumbai → Aurangabad", details: "Early morning departure. Drive to Aurangabad (6 hrs). Afternoon visit Bibi Ka Maqbara (Taj of the Deccan) and Panchakki. Check-in at hotel. Evening leisure." },
      { day: "Day 2", title: "Ajanta Caves (Full Day)", details: "Drive to Ajanta Caves (2 hrs). Explore the 30 rock-cut Buddhist cave monuments (2nd century BC). Paintings & sculptures. Return to Aurangabad by evening." },
      { day: "Day 3", title: "Ellora Caves → Mumbai", details: "Morning visit to Ellora Caves — 34 caves including the magnificent Kailasa Temple (Cave 16). After lunch, drive back to Mumbai. Arrive by late evening." },
    ],
    inclusions: ["AC car with driver for all 3 days", "Fuel charges", "Driver bata & night halts", "Toll & parking", "All sightseeing transfers"],
    exclusions: ["Hotel accommodation", "Meals", "Cave entry tickets", "Guide charges", "Personal expenses", "GST (5%)"],
  },
  {
    name: "Ashtavinayak Darshan",
    cat: "Pilgrimage",
    days: "3 Days",
    nights: "2 Nights",
    route: "Mumbai → 8 Ganesh Temples → Mumbai",
    car: "AC Sedan / Innova",
    price: "₹7,500",
    priceNote: "per person (min 2 pax)",
    gradient: "from-red-500 to-rose-600",
    emoji: "🙏",
    highlights: ["All 8 Ashtavinayak temples", "Optimized route for comfort", "Pune overnight stay"],
    itinerary: [
      { day: "Day 1", title: "Mumbai → Morgaon → Siddhatek → Pune", details: "Early departure. Visit Moreshwar Temple (Morgaon) and Siddhivinayak Temple (Siddhatek). Drive to Pune for overnight stay." },
      { day: "Day 2", title: "Pune → Theur → Lenyadri → Ozar → Ranjangaon", details: "Visit Chintamani (Theur), Girijatmaj (Lenyadri — 300 steps), Vigneshwar (Ozar), and Mahaganapati (Ranjangaon). Overnight in Pune." },
      { day: "Day 3", title: "Pali → Mahad → Mumbai", details: "Visit Ballaleshwar (Pali) and Varadvinayak (Mahad). Drive back to Mumbai by evening. All 8 temples completed!" },
    ],
    inclusions: ["AC car with driver for all 3 days", "Fuel charges", "Driver bata & night halts", "Toll & parking", "All temple transfers"],
    exclusions: ["Hotel accommodation", "Meals & prasad", "Temple donations", "Personal expenses", "GST (5%)"],
  },
  {
    name: "Konkan Coast Drive",
    cat: "Beach",
    days: "4 Days",
    nights: "3 Nights",
    route: "Mumbai → Alibaug → Ganpatipule → Ratnagiri → Mumbai",
    car: "SUV / Innova",
    price: "₹11,000",
    priceNote: "per person (min 3 pax)",
    gradient: "from-cyan-500 to-blue-600",
    emoji: "🌊",
    highlights: ["Pristine Konkan beaches", "Fresh seafood experiences", "Scenic coastal highway drive"],
    itinerary: [
      { day: "Day 1", title: "Mumbai → Alibaug", details: "Morning departure. Arrive Alibaug (2.5 hrs). Visit Alibaug Beach, Kolaba Fort (accessible by foot at low tide). Evening at Nagaon Beach. Overnight at Alibaug." },
      { day: "Day 2", title: "Alibaug → Ganpatipule", details: "Drive along the scenic coast to Ganpatipule (5 hrs). Visit the famous Swayambhu Ganpati Temple on the beach. Evening beach walk. Fresh Konkani seafood dinner." },
      { day: "Day 3", title: "Ganpatipule → Ratnagiri", details: "Morning beach time. Drive to Ratnagiri (2 hrs). Visit Ratnadurg Fort, Bhatye Beach, Thibaw Palace. Try Alphonso mango products at local markets." },
      { day: "Day 4", title: "Ratnagiri → Mumbai", details: "After breakfast, visit Jaigad Fort (optional). Begin return journey to Mumbai via NH66 (6 hrs). Arrive by evening." },
    ],
    inclusions: ["AC car with driver for all 4 days", "Fuel charges", "Driver bata & night halts", "Toll & parking", "All sightseeing transfers"],
    exclusions: ["Hotel accommodation", "Meals", "Ferry/boat rides", "Entry tickets", "Personal expenses", "GST (5%)"],
  },
  {
    name: "Corporate Day Outing",
    cat: "Corporate",
    days: "1 Day",
    nights: "0 Nights",
    route: "Customizable — Karjat / Pawna / Igatpuri",
    car: "Tempo Traveller / Fleet",
    price: "Custom Quote",
    priceNote: "bulk pricing for 10+ pax",
    gradient: "from-slate-600 to-zinc-700",
    emoji: "🏢",
    highlights: ["Team-building venues", "Bulk pricing for groups", "Dedicated trip coordinator"],
    itinerary: [
      { day: "Day 1", title: "Full Day — Customizable", details: "Morning pickup from office/common point. Drive to chosen venue (Karjat, Pawna Lake, Igatpuri, Imagica, etc.). Team activities, adventure sports, lunch at resort. Evening return to Mumbai. Itinerary fully customizable to your team's needs." },
    ],
    inclusions: ["AC tempo traveller / bus", "Fuel charges", "Driver bata & toll", "Trip coordinator", "Flexible timing"],
    exclusions: ["Venue/resort charges", "Meals & activities", "Adventure sport fees", "Personal expenses", "GST (5%)"],
  },
  {
    name: "Nashik Vineyard Tour",
    cat: "Heritage",
    days: "2 Days",
    nights: "1 Night",
    route: "Mumbai → Nashik → Trimbakeshwar → Mumbai",
    car: "AC Sedan / SUV",
    price: "₹5,000",
    priceNote: "per person (min 2 pax)",
    gradient: "from-purple-500 to-violet-600",
    emoji: "🍷",
    highlights: ["Sula & York vineyard visits", "Trimbakeshwar Jyotirlinga", "Wine tasting experience"],
    itinerary: [
      { day: "Day 1", title: "Mumbai → Nashik", details: "Morning departure. Drive to Nashik (3 hrs). Visit Sula Vineyards — wine tasting & vineyard tour. Lunch at Soma Vine Village. Afternoon visit Pandavleni Caves. Check-in at hotel." },
      { day: "Day 2", title: "Trimbakeshwar → Mumbai", details: "Early morning visit to Trimbakeshwar Temple (Jyotirlinga). Visit Anjneri Fort viewpoint. Late breakfast. Drive back to Mumbai via Kasara Ghat. Arrive by afternoon." },
    ],
    inclusions: ["AC car with driver for 2 days", "Fuel charges", "Driver bata & night halt", "Toll & parking", "All sightseeing transfers"],
    exclusions: ["Hotel accommodation", "Meals", "Wine tasting fees", "Temple donations", "Personal expenses", "GST (5%)"],
  },
];

function PackagesPage() {
  const [active, setActive] = useState<Cat>("All");
  const [expandedPkg, setExpandedPkg] = useState<string | null>(null);
  const filtered = active === "All" ? packages : packages.filter((p) => p.cat === active);

  useEffect(() => {
    setPageMeta({
      title: "Tour Packages from Mumbai | Manasvi Tours & Travels",
      description: "Curated tour packages across Maharashtra & India — Shirdi, Goa, Mahabaleshwar, Konkan, Ajanta-Ellora. Transparent pricing, all-inclusive cab service.",
      url: "/packages"
    });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* ══════ Hero ══════ */}
        <section className="relative pt-24 pb-14 sm:pt-32 sm:pb-20 bg-gradient-to-br from-navy via-navy to-near-black text-white overflow-hidden">
          <div className="pointer-events-none absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-brand-light/25 blur-3xl animate-blob" />
          <div className="pointer-events-none absolute -top-10 -left-10 w-60 h-60 rounded-full bg-brand/20 blur-3xl animate-blob" style={{ animationDelay: "-4s" }} />
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <Reveal variant="up">
              <div className="max-w-3xl">
                <span className="inline-block px-3 py-1 rounded-full bg-brand-light/20 text-brand-light text-xs font-medium border border-brand-light/30 mb-4">
                  🗺️ {packages.length} Curated Packages
                </span>
                <h1 className="text-3xl sm:text-5xl font-bold leading-tight">
                  Tour Packages from <span className="text-brand-light">Mumbai</span>
                </h1>
                <p className="mt-4 text-white/80 max-w-2xl text-base sm:text-lg">
                  Hand-crafted itineraries for pilgrimage, hill stations, beaches & heritage. Cab-only packages — you choose your hotel, we handle the drive.
                </p>
              </div>
            </Reveal>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { value: `${packages.length}+`, label: "Tour Packages" },
                { value: "50+", label: "Destinations" },
                { value: "4.8★", label: "Avg Rating" },
                { value: "24/7", label: "Support" },
              ].map(s => (
                <div key={s.label} className="rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm px-4 py-3 text-center">
                  <p className="text-xl sm:text-2xl font-bold text-white">{s.value}</p>
                  <p className="text-xs text-white/70 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════ Category Filter + Package Cards ══════ */}
        <section className="py-14 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-wrap gap-2 mb-10 justify-center">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setActive(c)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition ${
                    active === c ? "bg-brand text-brand-foreground shadow-lg shadow-brand/25" : "bg-soft text-foreground hover:bg-brand/10"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {filtered.map((p) => (
                <PackageCard
                  key={p.name}
                  p={p}
                  isExpanded={expandedPkg === p.name}
                  onToggle={() => setExpandedPkg(expandedPkg === p.name ? null : p.name)}
                />
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-16">
                <p className="text-2xl font-bold text-navy">No packages in this category yet</p>
                <p className="mt-2 text-muted-foreground">Request a custom package on WhatsApp!</p>
              </div>
            )}
          </div>
        </section>

        {/* ══════ How It Works ══════ */}
        <section className="py-14 sm:py-20 bg-soft">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <Reveal variant="up">
              <div className="text-center mb-10">
                <h2 className="text-2xl sm:text-4xl font-bold text-navy">How Package Booking Works</h2>
                <p className="mt-3 text-muted-foreground">Simple, transparent, no hassle</p>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
              {[
                { n: 1, title: "Choose Package", desc: "Browse our curated packages or request a custom one.", icon: "📦" },
                { n: 2, title: "Get Quote", desc: "We share the exact fare breakdown within 30 minutes.", icon: "💬" },
                { n: 3, title: "Confirm & Pay", desc: "Pay a small advance. Rest after the trip.", icon: "✅" },
                { n: 4, title: "Travel & Enjoy", desc: "Verified driver arrives on time. We handle the rest!", icon: "🚗" },
              ].map(s => (
                <div key={s.n} className="bg-card border rounded-2xl p-5 text-center hover:-translate-y-1 hover:shadow-lg transition-all">
                  <div className="text-3xl mb-3">{s.icon}</div>
                  <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-brand text-brand-foreground text-sm font-bold mb-2">{s.n}</div>
                  <h3 className="font-bold text-navy text-sm">{s.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════ Custom Package CTA ══════ */}
        <section className="relative py-14 sm:py-20 bg-gradient-to-br from-navy via-navy to-near-black text-white overflow-hidden">
          <div className="pointer-events-none absolute -top-20 -right-20 w-96 h-96 rounded-full bg-brand-light/20 blur-3xl animate-blob" />
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
            <Reveal variant="up">
              <div className="text-center mb-8">
                <span className="inline-block px-3 py-1 rounded-full bg-brand-light/20 text-brand-light text-xs font-medium border border-brand-light/30 mb-3">
                  Custom Trip
                </span>
                <h2 className="text-2xl sm:text-4xl font-bold">
                  Can't find your destination? <span className="text-brand-light">We'll plan it for you!</span>
                </h2>
                <p className="mt-3 text-white/80 max-w-xl mx-auto">
                  Tell us where you want to go, how many days, and your budget. We'll craft a personalized itinerary and share a quote within 1 hour.
                </p>
              </div>
            </Reveal>
            <CustomPackageForm />
          </div>
        </section>

        {/* ══════ Why Choose Us ══════ */}
        <section className="py-14 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <Reveal variant="up">
              <div className="text-center mb-10">
                <h2 className="text-2xl sm:text-4xl font-bold text-navy">Why Travel With Manasvi?</h2>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { icon: <Shield className="h-6 w-6" />, title: "Verified Drivers", desc: "Background-checked, experienced drivers for every trip." },
                { icon: <MapPin className="h-6 w-6" />, title: "Cab-Only Packages", desc: "You choose your hotel & food. We handle the comfortable drive." },
                { icon: <Star className="h-6 w-6" />, title: "4.8★ Rated", desc: "Trusted by 12,000+ happy travellers across India." },
                { icon: <Phone className="h-6 w-6" />, title: "24/7 On-Trip Support", desc: "Dedicated support on WhatsApp throughout your journey." },
              ].map(f => (
                <div key={f.title} className="rounded-2xl bg-card border p-6 text-center hover:-translate-y-1 hover:shadow-lg transition-all">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand/10 text-brand mb-3">{f.icon}</div>
                  <h3 className="font-bold text-navy text-sm">{f.title}</h3>
                  <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
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

/* ── Custom Package Form ── */
function CustomPackageForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [pax, setPax] = useState("");
  const [days, setDays] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hi Manasvi Tours! I'd like a custom package quote.\n\nName: ${name}\nWhatsApp: ${phone}\nDestination: ${destination}\nTravel Date: ${date}\nPassengers: ${pax}\nDays: ${days}\n\nPlease share an itinerary & quote.`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/919821790471?text=${encoded}`, "_blank");
  };

  return (
    <form
      onSubmit={submit}
      className="bg-white/10 border border-white/20 backdrop-blur-sm rounded-2xl p-5 sm:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      <FormInput label="Your Name" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} required />
      <FormInput label="WhatsApp Number" placeholder="+91 98217 90471" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
      <FormInput label="Destination" placeholder="Goa, Shirdi, Open..." value={destination} onChange={(e) => setDestination(e.target.value)} required />
      <FormInput label="Travel Date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      <FormInput label="Passengers" placeholder="e.g. 4" type="number" min={1} value={pax} onChange={(e) => setPax(e.target.value)} required />
      <FormInput label="No. of Days" placeholder="e.g. 3" type="number" min={1} value={days} onChange={(e) => setDays(e.target.value)} required />
      <button
        type="submit"
        className="sm:col-span-2 lg:col-span-3 mt-2 bg-[#25D366] hover:bg-[#1FB955] text-white rounded-xl font-semibold h-12 flex items-center justify-center gap-2 transition shadow-lg"
      >
        <WhatsAppIcon className="h-5 w-5" /> Get Custom Quote on WhatsApp
      </button>
    </form>
  );
}

function FormInput({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-white/80 uppercase tracking-wide">{label}</span>
      <input
        {...rest}
        className="mt-1.5 w-full h-12 px-3 rounded-lg bg-white/10 border border-white/30 placeholder:text-white/50 focus:border-brand-light outline-none text-sm text-white transition"
      />
    </label>
  );
}

/* ── Package Card ── */
function PackageCard({ p, isExpanded, onToggle }: { p: Package; isExpanded: boolean; onToggle: () => void }) {
  const [showItinerary, setShowItinerary] = useState(false);

  return (
    <div className="rounded-2xl bg-card border overflow-hidden hover:shadow-xl transition-all flex flex-col">
      {/* Gradient Header (no external images) */}
      <div className={`relative h-44 bg-gradient-to-br ${p.gradient} overflow-hidden`}>
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 border border-white/30">
            <Calendar className="h-3 w-3" /> {p.days}
          </span>
          <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full border border-white/30">
            {p.cat}
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <div className="text-3xl mb-1">{p.emoji}</div>
          <h3 className="text-xl font-bold leading-tight drop-shadow-lg">{p.name}</h3>
          <p className="text-xs text-white/90 mt-1 flex items-center gap-1">
            <MapPin className="h-3 w-3" /> {p.route}
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        {/* Price + Car */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-2xl font-bold text-brand">{p.price}</p>
            <p className="text-[10px] text-muted-foreground">{p.priceNote}</p>
          </div>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <Users className="h-3 w-3" /> {p.car}
          </p>
        </div>

        {/* Highlights */}
        <ul className="mt-4 space-y-1.5">
          {p.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2 text-sm">
              <Check className="h-4 w-4 text-brand mt-0.5 shrink-0" /> {h}
            </li>
          ))}
        </ul>

        {/* View Itinerary Toggle */}
        <button
          type="button"
          onClick={() => setShowItinerary(!showItinerary)}
          className="mt-4 flex items-center justify-between w-full text-sm font-semibold text-navy py-2.5 border-t border-border"
        >
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-brand" /> Day-by-Day Itinerary
          </span>
          <ChevronDown className={`h-4 w-4 transition-transform ${showItinerary ? "rotate-180" : ""}`} />
        </button>
        <div className={`overflow-hidden transition-all duration-300 ${showItinerary ? "max-h-[600px]" : "max-h-0"}`}>
          <div className="space-y-3 pt-2 pb-1">
            {p.itinerary.map((d) => (
              <div key={d.day} className="relative pl-5 border-l-2 border-brand/30">
                <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-brand" />
                <p className="text-xs font-bold text-brand uppercase">{d.day}</p>
                <p className="text-sm font-semibold text-navy">{d.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">{d.details}</p>
              </div>
            ))}
          </div>
          {/* Inclusions/Exclusions in itinerary view */}
          <div className="mt-3 grid grid-cols-2 gap-2 text-[10px]">
            <div className="bg-green-50 dark:bg-green-950/30 rounded-lg p-2.5">
              <p className="font-bold text-green-700 dark:text-green-400 mb-1">Included</p>
              {p.inclusions.map(i => (
                <p key={i} className="flex items-start gap-1 text-green-600 dark:text-green-400/80">
                  <Check className="h-3 w-3 shrink-0 mt-0.5" /> {i}
                </p>
              ))}
            </div>
            <div className="bg-red-50 dark:bg-red-950/30 rounded-lg p-2.5">
              <p className="font-bold text-red-700 dark:text-red-400 mb-1">Extra</p>
              {p.exclusions.map(i => (
                <p key={i} className="flex items-start gap-1 text-red-600 dark:text-red-400/80">
                  <X className="h-3 w-3 shrink-0 mt-0.5" /> {i}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-auto pt-4 grid grid-cols-1 gap-2">
          <button
            onClick={() => bookOnWhatsApp({ package: p.name })}
            className="py-2.5 rounded-lg bg-brand text-brand-foreground text-sm font-medium hover:bg-brand/90 transition flex items-center justify-center gap-2"
          >
            <WhatsAppIcon className="h-4 w-4" /> Book This Package
          </button>
        </div>
      </div>
    </div>
  );
}
