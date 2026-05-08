import { Car, Phone, Mail, MessageCircle, Instagram, Facebook, Youtube, Lock, ShieldCheck, BadgeCheck, FileCheck, Send } from "lucide-react";
import { useState } from "react";

export function Footer() {
  const [phone, setPhone] = useState("");
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;
    const msg = encodeURIComponent(`Hi! Please add ${phone} to WhatsApp deal alerts.`);
    window.open(`https://wa.me/919876543210?text=${msg}`, "_blank");
  };

  return (
    <>
      {/* Newsletter / WhatsApp opt-in strip */}
      <section className="bg-gradient-to-r from-navy via-navy to-brand text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold">Get exclusive deals on WhatsApp</h3>
            <p className="text-sm text-white/80 mt-1">Weekly route discounts and seasonal package offers.</p>
          </div>
          <form onSubmit={submit} className="flex w-full md:w-auto gap-2">
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="tel"
              placeholder="+91 9876543210"
              className="flex-1 md:w-64 h-11 px-3 rounded-lg bg-white/10 border border-white/30 placeholder:text-white/50 outline-none focus:border-brand-light text-sm"
            />
            <button
              type="submit"
              className="h-11 px-4 rounded-lg bg-brand-light text-navy font-semibold text-sm hover:bg-white transition flex items-center gap-1.5"
            >
              <Send className="h-4 w-4" /> Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Trust badges row */}
      <section className="bg-near-black border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs sm:text-sm text-white/80">
          <TrustBadge icon={<Lock className="h-4 w-4" />} text="SSL Secured" />
          <TrustBadge icon={<ShieldCheck className="h-4 w-4" />} text="100% Refund Guarantee" />
          <TrustBadge icon={<BadgeCheck className="h-4 w-4" />} text="Verified Drivers" />
          <TrustBadge icon={<FileCheck className="h-4 w-4" />} text="GST Registered" />
        </div>
      </section>

      <footer id="footer" className="bg-near-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          <div>
            <div className="flex items-center gap-2 font-bold text-lg">
              <Car className="h-6 w-6 text-brand-light" />
              <span>Manasvi Tours and Travels</span>
            </div>
            <p className="mt-3 text-sm text-white/70 italic">"Your Journey, Our Responsibility"</p>
            <div className="flex gap-3 mt-5">
              <a aria-label="Instagram" className="h-9 w-9 rounded-full bg-white/10 hover:bg-brand transition flex items-center justify-center" href="#"><Instagram className="h-4 w-4" /></a>
              <a aria-label="Facebook" className="h-9 w-9 rounded-full bg-white/10 hover:bg-brand transition flex items-center justify-center" href="#"><Facebook className="h-4 w-4" /></a>
              <a aria-label="YouTube" className="h-9 w-9 rounded-full bg-white/10 hover:bg-brand transition flex items-center justify-center" href="#"><Youtube className="h-4 w-4" /></a>
            </div>
          </div>
          <FooterCol title="Quick Links" items={["Home", "Outstation", "Packages", "My Bookings", "FAQ"]} />
          <FooterCol title="Services" items={["Outstation Cabs", "Local Rentals", "Airport Transfer", "Tour Packages", "Corporate Travel"]} />
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-white/80">
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-brand-light shrink-0" /><span>+91 98765 43210</span></li>
              <li className="flex items-center gap-2 break-all"><Mail className="h-4 w-4 text-brand-light shrink-0" /><span>hello@manasvitours.com</span></li>
            </ul>
            <a
              href="https://wa.me/919876543210"
              target="_blank" rel="noreferrer"
              className="mt-4 inline-flex w-full sm:w-auto items-center justify-center gap-2 px-4 py-2 rounded-md bg-green-600 hover:bg-green-500 text-white text-sm font-medium transition"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp Us
            </a>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 text-center text-xs text-white/60">
            © 2025 Manasvi Tours and Travels. All Rights Reserved.
          </div>
        </div>
      </footer>
    </>
  );
}

function TrustBadge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center justify-center gap-2">
      <span className="text-brand-light">{icon}</span>
      <span>{text}</span>
    </div>
  );
}

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="font-semibold mb-4">{title}</h4>
      <ul className="space-y-2 text-sm text-white/70">
        {items.map((i) => (
          <li key={i}>
            <a href="#" className="hover:text-brand-light transition">{i}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
