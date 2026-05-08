import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Search, MessageCircle, Phone, MapPin, Calendar, Car, User, Star, CheckCircle2, History } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/bookings")({
  head: () => ({
    meta: [
      { title: "Track Your Booking — Manasvi Tours and Travels" },
      { name: "description", content: "Look up your booking by ID or registered mobile number." },
      { property: "og:title", content: "My Bookings — Manasvi Tours" },
      { property: "og:description", content: "Track your trip in real time." },
    ],
  }),
  component: BookingsPage,
});

const recent = [
  { id: "MTT-1042", route: "Mumbai → Pune", date: "12 May 2026", car: "Swift Dzire", status: "Completed" },
  { id: "MTT-1056", route: "Mumbai → Shirdi", date: "20 May 2026", car: "Innova", status: "Confirmed" },
  { id: "MTT-1063", route: "Pune Local 8hr", date: "25 May 2026", car: "Honda Amaze", status: "En Route" },
];

const statusColor: Record<string, string> = {
  Completed: "bg-muted text-foreground",
  Confirmed: "bg-brand/10 text-brand",
  "En Route": "bg-brand-light/30 text-navy",
};

function BookingsPage() {
  const [tab, setTab] = useState<"track" | "history">("track");
  const [query, setQuery] = useState("");
  const [shown, setShown] = useState(false);

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-navy">Manage Your Bookings</h1>
            <p className="mt-3 text-muted-foreground">Track your live trip or browse past bookings.</p>
          </div>

          {/* Tabs */}
          <div className="bg-soft border rounded-xl p-1 inline-flex w-full mb-6">
            <button
              onClick={() => setTab("track")}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition flex items-center justify-center gap-2 ${
                tab === "track" ? "bg-brand text-brand-foreground shadow" : "text-muted-foreground"
              }`}
            >
              <Search className="h-4 w-4" /> Track Booking
            </button>
            <button
              onClick={() => setTab("history")}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition flex items-center justify-center gap-2 ${
                tab === "history" ? "bg-brand text-brand-foreground shadow" : "text-muted-foreground"
              }`}
            >
              <History className="h-4 w-4" /> Booking History
            </button>
          </div>

          {tab === "track" && (
            <>
              <div className="bg-card border rounded-2xl p-5 sm:p-8 shadow-lg">
                <label className="block">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Booking ID or Mobile</span>
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="MTT-1056 or 9876543210"
                    className="mt-1.5 w-full h-12 px-3 rounded-lg bg-soft border border-border focus:border-brand outline-none text-sm"
                  />
                </label>
                <button
                  onClick={() => setShown(true)}
                  className="mt-4 w-full bg-brand hover:bg-brand/90 text-brand-foreground rounded-lg font-semibold h-12 flex items-center justify-center gap-2 transition"
                >
                  <Search className="h-4 w-4" /> Find My Booking
                </button>
              </div>

              {shown && (
                <div className="mt-8 space-y-5 animate-fade-up">
                  {/* Status card */}
                  <div className="bg-card border rounded-2xl p-5 sm:p-7 shadow-lg">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div>
                        <p className="text-xs text-muted-foreground">Booking ID</p>
                        <h2 className="text-xl font-bold text-navy">MTT-1056</h2>
                      </div>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Confirmed
                      </span>
                    </div>
                    <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <Info icon={<Car className="h-4 w-4" />} label="Trip Type" value="Outstation · One Way" />
                      <Info icon={<Calendar className="h-4 w-4" />} label="Date" value="20 May 2026, 06:30 AM" />
                      <Info icon={<Car className="h-4 w-4" />} label="Car" value="Toyota Innova · MH-12 KX 4521" />
                      <Info icon={<MapPin className="h-4 w-4" />} label="Distance" value="240 km · Approx 4 hr" />
                    </div>

                    {/* Trip timeline */}
                    <div className="mt-6 bg-soft rounded-xl p-4">
                      <div className="flex items-start gap-4">
                        <div className="flex flex-col items-center">
                          <div className="h-3 w-3 rounded-full bg-brand ring-4 ring-brand/20" />
                          <div className="w-0.5 flex-1 bg-brand-light/60 my-1 min-h-10" />
                          <div className="h-3 w-3 rounded-full bg-navy ring-4 ring-navy/20" />
                        </div>
                        <div className="flex-1 space-y-5">
                          <div>
                            <p className="text-xs text-muted-foreground uppercase">Pickup</p>
                            <p className="font-medium text-near-black">Andheri East, Mumbai</p>
                            <p className="text-xs text-muted-foreground">06:30 AM · 20 May</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground uppercase">Drop</p>
                            <p className="font-medium text-near-black">Sai Baba Temple, Shirdi</p>
                            <p className="text-xs text-muted-foreground">Est. 10:45 AM</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Driver card */}
                  <div className="bg-card border rounded-2xl p-5 sm:p-6 shadow-lg">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Your Driver</p>
                    <div className="mt-3 flex items-center gap-4">
                      <div className="h-16 w-16 rounded-full bg-brand-light/30 text-navy flex items-center justify-center font-bold text-xl shrink-0">
                        RP
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-navy text-lg">Ramesh Patil</h3>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-3.5 w-3.5 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted"}`} />
                          ))}
                          <span className="ml-1">4.9 · 1,240 trips</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">12 yrs experience · Marathi, Hindi, English</p>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <a
                        href="tel:+919876543210"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-navy text-navy text-sm font-medium hover:bg-navy hover:text-navy-foreground transition"
                      >
                        <Phone className="h-4 w-4" /> Call Driver
                      </a>
                      <a
                        href="https://wa.me/919876543210"
                        target="_blank" rel="noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#25D366] text-white text-sm font-medium hover:opacity-90 transition"
                      >
                        <MessageCircle className="h-4 w-4" /> WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {tab === "history" && (
            <div className="bg-card border rounded-2xl overflow-hidden shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-soft text-left">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Booking ID</th>
                      <th className="px-4 py-3 font-semibold">Route</th>
                      <th className="px-4 py-3 font-semibold">Date</th>
                      <th className="px-4 py-3 font-semibold">Car</th>
                      <th className="px-4 py-3 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recent.map((r) => (
                      <tr key={r.id} className="border-t hover:bg-soft/50 transition">
                        <td className="px-4 py-3 font-medium">{r.id}</td>
                        <td className="px-4 py-3">{r.route}</td>
                        <td className="px-4 py-3 text-muted-foreground">{r.date}</td>
                        <td className="px-4 py-3">{r.car}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusColor[r.status]}`}>
                            {r.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Info({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 text-brand">{icon}</span>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-medium text-near-black">{value}</p>
      </div>
    </div>
  );
}
