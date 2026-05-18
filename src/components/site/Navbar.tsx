import { useEffect, useState } from "react";
import { Menu, X, Compass, Phone } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { bookOnWhatsApp } from "@/lib/whatsapp";

type NavLink = { label: string; to?: string; href?: string };

const links: NavLink[] = [
  { label: "Home", to: "/" },
  { label: "Our Fleet", href: "/#cars" },
  { label: "About", to: "/about" },
  { label: "Outstation", to: "/outstation" },
  { label: "Packages", to: "/packages" },
  { label: "Contact", to: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const renderLink = (l: NavLink, onClick?: () => void, className?: string) =>
    l.to ? (
      <Link
        key={l.label}
        to={l.to}
        onClick={onClick}
        className={className}
        activeProps={{ className: (className ?? "") + " text-brand-light" }}
      >
        {l.label}
      </Link>
    ) : (
      <a key={l.label} href={l.href} onClick={onClick} className={className}>
        {l.label}
      </a>
    );

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 bg-navy text-navy-foreground transition-shadow ${
        scrolled ? "shadow-lg shadow-black/20" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold min-w-0">
          <Compass className="h-6 w-6 text-brand-light shrink-0" />
          <span className="text-sm sm:text-lg tracking-tight truncate">Manasvi Tours and Travels</span>
        </Link>
        <nav className="hidden lg:flex items-center gap-7 text-sm">
          {links.map((l) => renderLink(l, undefined, "hover:text-brand-light transition-colors"))}
        </nav>
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="tel:+919821790471"
            className="flex items-center gap-1.5 text-sm text-brand-light hover:text-white transition"
          >
            <Phone className="h-4 w-4" />
            <span className="font-medium">+91 98217 90471</span>
          </a>

          <button onClick={() => bookOnWhatsApp({})} className="pulse-cta px-4 py-2 text-sm rounded-md bg-brand hover:bg-brand/90 font-medium transition">
            Book Now
          </button>
        </div>
        <button
          className="lg:hidden p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden absolute top-16 inset-x-0 bg-navy/95 backdrop-blur-md border-b border-white/10 px-4 py-6 space-y-4 shadow-2xl animate-fade-in">
          {links.map((l) => renderLink(l, () => setOpen(false), "block text-base sm:text-lg py-2 font-medium hover:text-brand-light border-b border-white/5 last:border-0"))}
          <div className="flex gap-3 pt-4">

            <button onClick={() => bookOnWhatsApp({})} className="flex-1 px-4 py-3 text-sm font-semibold rounded-md bg-brand hover:bg-brand/90 transition shadow-lg shadow-brand/20">
              Book Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
