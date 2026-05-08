import { useEffect, useState } from "react";
import { Menu, X, Car } from "lucide-react";
import { Link } from "@tanstack/react-router";

type NavLink = { label: string; to?: string; href?: string };

const links: NavLink[] = [
  { label: "Home", to: "/" },
  { label: "Our Fleet", href: "/#cars" },
  { label: "Outstation", to: "/outstation" },
  { label: "Packages", to: "/packages" },
  { label: "My Bookings", to: "/bookings" },
  { label: "Contact", href: "/#footer" },
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
          <Car className="h-6 w-6 text-brand-light shrink-0" />
          <span className="text-sm sm:text-lg tracking-tight truncate">Manasvi Tours and Travels</span>
        </Link>
        <nav className="hidden lg:flex items-center gap-7 text-sm">
          {links.map((l) => renderLink(l, undefined, "hover:text-brand-light transition-colors"))}
        </nav>
        <div className="hidden lg:flex items-center gap-3">
          <button className="px-4 py-2 text-sm rounded-md border border-white/40 hover:bg-white/10 transition">
            Login / Sign Up
          </button>
          <button className="px-4 py-2 text-sm rounded-md bg-brand hover:bg-brand/90 font-medium transition">
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
        <div className="lg:hidden bg-navy border-t border-white/10 px-4 py-4 space-y-3">
          {links.map((l) => renderLink(l, () => setOpen(false), "block text-sm py-1 hover:text-brand-light"))}
          <div className="flex gap-3 pt-2">
            <button className="flex-1 px-4 py-2 text-sm rounded-md border border-white/40">
              Login
            </button>
            <button className="flex-1 px-4 py-2 text-sm rounded-md bg-brand">Book Now</button>
          </div>
        </div>
      )}
    </header>
  );
}
