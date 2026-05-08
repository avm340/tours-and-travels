import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Search, MessageCircle, Phone, MapPin, Calendar, Car, User } from "lucide-react";
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
  const [query, setQuery] = useState("");
  const [shown, setShown] = useState(false);

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-navy">Track Your Booking</h1>
            <p className="mt-3 text-muted-foreground">Enter your Booking ID or registered mobile number.</p>
          </div>

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
            <div className="mt-8 bg-card border rounded-2xl p-5 sm:p-7 animate-fade-up">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <p className="text-xs text-muted-foreground">Booking ID</p>
                  <h2 className="text-xl font-bold text-navy">MTT-1056</h2>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-brand-light/30 text-navy">En Route</span>
              </div>
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <Info icon={<Car className="h-4 w-4" />} label="Trip Type" value="Outstation · One Way" />
                <Info icon={<MapPin className="h-4 w-4" />} label="Route" value="Mumbai → Shirdi" />
                <Info icon={<Calendar className="h-4 w-4" />} label="Date" value="20 May 2026, 06:30 AM" />
                <Info icon={<Car className="h-4 w-4" />} label="Car Assigned" value="Toyota Innova · MH-12 KX 4521" />
                <Info icon={<User className="h-4 w-4" />} label="Driver" value="Ramesh Patil" />
                <Info icon={<Phone className="h-4 w-4" />} label="Driver Mobile" value="+91 98765 43210" />
              </div>
              <div className="mt-5 flex gap-3 flex-wrap">
                <a
                  href="https://wa.me/919876543210"
                  target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#25D366] text-white text-sm font-medium hover:opacity-90 transition"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp Driver
                </a>
                <a
                  href="tel:+919876543210"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-navy text-navy text-sm font-medium hover:bg-navy hover:text-navy-foreground transition"
                >
                  <Phone className="h-4 w-4" /> Call Driver
                </a>
              </div>
            </div>
          )}

          {/* Recent Bookings */}
          <div className="mt-12">
            <h3 className="text-xl font-bold text-navy mb-4">Recent Bookings</h3>
            <div className="overflow-x-auto bg-card border rounded-2xl">
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
                    <tr key={r.id} className="border-t">
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
