import { Car, Phone, Mail, MessageCircle, Instagram, Facebook, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer id="footer" className="bg-near-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
        <div>
          <div className="flex items-center gap-2 font-bold text-lg">
            <Car className="h-6 w-6 text-brand-light" />
            <span>Manasvi Tours and Travels</span>
          </div>
          <p className="mt-3 text-sm text-white/70 italic">"Your Journey, Our Responsibility"</p>
          <div className="flex gap-3 mt-5">
            <a className="h-9 w-9 rounded-full bg-white/10 hover:bg-brand transition flex items-center justify-center" href="#"><Instagram className="h-4 w-4" /></a>
            <a className="h-9 w-9 rounded-full bg-white/10 hover:bg-brand transition flex items-center justify-center" href="#"><Facebook className="h-4 w-4" /></a>
            <a className="h-9 w-9 rounded-full bg-white/10 hover:bg-brand transition flex items-center justify-center" href="#"><Youtube className="h-4 w-4" /></a>
          </div>
        </div>
        <FooterCol title="Quick Links" items={["Home", "About Us", "How It Works", "Tariff", "FAQ"]} />
        <FooterCol title="Our Cars" items={["Hatchback", "Sedan", "SUV", "MUV", "Luxury"]} />
        <div>
          <h4 className="font-semibold mb-4">Contact Us</h4>
          <ul className="space-y-3 text-sm text-white/80">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-brand-light shrink-0" /><span>+91 98765 43210</span></li>
            <li className="flex items-center gap-2 break-all"><Mail className="h-4 w-4 text-brand-light shrink-0" /><span>hello@manasvitours.com</span></li>
          </ul>
          <a
            href="#"
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
