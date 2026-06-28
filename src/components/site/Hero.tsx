import heroImg from "@/assets/hero-car.jpg";
import { ShieldCheck, XCircle, Headphones, MapPin, Users, Star, Map, ChevronLeft, ChevronRight, Clock, CalendarDays, Route, Sun, Plane, Package } from "lucide-react";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { useScrollY } from "@/hooks/use-reveal";
import { CountUp } from "./CountUp";
import { useState, useRef, useEffect, useMemo } from "react";

/* ── Popular destination suggestions ── */
const DESTINATIONS = [
  { name: "Pune", tag: "Popular" },
  { name: "Shirdi", tag: "Popular" },
  { name: "Goa", tag: "Popular" },
  { name: "Lonavala", tag: "Popular" },
  { name: "Mahabaleshwar", tag: "Hill Station" },
  { name: "Nashik", tag: "Temple" },
  { name: "Nagpur", tag: "City" },
  { name: "Kolhapur", tag: "Temple" },
  { name: "Alibag", tag: "Beach" },
  { name: "Jaipur", tag: "Heritage" },
  { name: "Udaipur", tag: "Heritage" },
  { name: "Delhi", tag: "Metro" },
  { name: "Agra", tag: "Heritage" },
  { name: "Varanasi", tag: "Temple" },
  { name: "Manali", tag: "Hill Station" },
  { name: "Shimla", tag: "Hill Station" },
  { name: "Ooty", tag: "Hill Station" },
  { name: "Mysore", tag: "Heritage" },
  { name: "Hyderabad", tag: "Metro" },
  { name: "Bangalore", tag: "Metro" },
  { name: "Kerala", tag: "Backwaters" },
  { name: "Darjeeling", tag: "Hill Station" },
  { name: "Rishikesh", tag: "Adventure" },
  { name: "Amritsar", tag: "Temple" },
];

/* ── Trip categories ── */
const CATEGORIES = [
  { value: "Outstation", label: "Outstation", icon: Route },
  { value: "Local — Half Day", label: "Half Day", icon: Clock },
  { value: "Local — Full Day", label: "Full Day", icon: Sun },
  { value: "Airport Transfer", label: "Airport", icon: Plane },
  { value: "Tour Package", label: "Tour Package", icon: Package },
];



/* ── Calendar helpers ── */
const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export function Hero() {
  const y = useScrollY();
  const [round, setRound] = useState(false);

  const [category, setCategory] = useState("Outstation");
  const [toCity, setToCity] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState("09:00");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState("1");
  const [errors, setErrors] = useState<Record<string, string>>({});

  /* Calendar state */
  const [showCalendar, setShowCalendar] = useState(false);

  const [calMonth, setCalMonth] = useState(new Date().getMonth());
  const [calYear, setCalYear] = useState(new Date().getFullYear());
  const calRef = useRef<HTMLDivElement>(null);


  /* Autocomplete state */
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightIdx, setHighlightIdx] = useState(-1);
  const suggestRef = useRef<HTMLDivElement>(null);
  const toCityRef = useRef<HTMLInputElement>(null);

  const now = new Date();
  const minBookingDate = new Date(now.getTime() + 12 * 60 * 60 * 1000);

  /* Filter destinations */
  const filteredDestinations = useMemo(() => {
    if (!toCity.trim()) return DESTINATIONS;
    const q = toCity.toLowerCase();
    return DESTINATIONS.filter(d =>
      d.name.toLowerCase().includes(q) || d.tag.toLowerCase().includes(q)
    );
  }, [toCity]);

  /* Close dropdowns on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (calRef.current && !calRef.current.contains(e.target as Node)) setShowCalendar(false);

      if (suggestRef.current && !suggestRef.current.contains(e.target as Node) &&
          toCityRef.current && !toCityRef.current.contains(e.target as Node)) setShowSuggestions(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* Calendar navigation */
  const prevMonth = () => {
    if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1); }
    else setCalMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1); }
    else setCalMonth(m => m + 1);
  };

  /* Is date selectable? */
  const isDateDisabled = (day: number) => {
    const d = new Date(calYear, calMonth, day);
    d.setHours(23, 59, 59); // allow selecting today even if past noon
    return d < new Date(minBookingDate.getFullYear(), minBookingDate.getMonth(), minBookingDate.getDate());
  };

  const isToday = (day: number) => {
    const t = new Date();
    return day === t.getDate() && calMonth === t.getMonth() && calYear === t.getFullYear();
  };

  const isSelected = (day: number) => {
    if (!selectedDate) return false;
    return day === selectedDate.getDate() && calMonth === selectedDate.getMonth() && calYear === selectedDate.getFullYear();
  };

  const selectDay = (day: number) => {
    if (isDateDisabled(day)) return;
    setSelectedDate(new Date(calYear, calMonth, day));
    setErrors(p => ({ ...p, date: "" }));
    setShowCalendar(false);
  };

  /* Build calendar grid */
  const daysInMonth = getDaysInMonth(calYear, calMonth);
  const firstDay = getFirstDayOfWeek(calYear, calMonth);
  const prevMonthDays = calMonth === 0 ? getDaysInMonth(calYear - 1, 11) : getDaysInMonth(calYear, calMonth - 1);

  const calendarCells: { day: number; outside: boolean }[] = [];
  // Previous month's trailing days
  for (let i = firstDay - 1; i >= 0; i--) {
    calendarCells.push({ day: prevMonthDays - i, outside: true });
  }
  // Current month
  for (let d = 1; d <= daysInMonth; d++) {
    calendarCells.push({ day: d, outside: false });
  }
  // Next month's leading days
  const remaining = 42 - calendarCells.length;
  for (let d = 1; d <= remaining; d++) {
    calendarCells.push({ day: d, outside: true });
  }

  const formattedDate = selectedDate
    ? `${selectedDate.getDate()} ${MONTHS[selectedDate.getMonth()].slice(0, 3)} ${selectedDate.getFullYear()}`
    : "";

  const handleSearch = () => {
    const newErrors: Record<string, string> = {};
    if (!toCity.trim()) newErrors.toCity = "Destination is required";
    else if (toCity.toLowerCase() === "mumbai") newErrors.toCity = "Destination cannot be Mumbai";

    if (!selectedDate) newErrors.date = "Pickup date is required";

    if (round) {
      if (!returnDate) newErrors.returnDate = "Return date is required";
      else if (selectedDate && new Date(returnDate) < selectedDate) newErrors.returnDate = "Must be after pickup date";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    const dateStr = selectedDate
      ? `${selectedDate.getFullYear()}-${(selectedDate.getMonth()+1).toString().padStart(2,"0")}-${selectedDate.getDate().toString().padStart(2,"0")}T${selectedTime}`
      : "";

    bookOnWhatsApp({
        tripType: round ? `${category} (Round Trip)` : category,
        from: "Mumbai",
        to: toCity,
        date: dateStr + (round && returnDate ? ` to ${returnDate}` : ""),
        passengers,
      });
  };

  return (
    <section
      id="home"
      className="relative min-h-[88vh] pt-16 flex items-center text-white overflow-hidden"
    >
      <img
        src={heroImg}
        alt="Chauffeur-driven cab on scenic highway"
        width={1920}
        height={1088}
        fetchpriority="high"
        className="absolute inset-0 w-full h-[115%] object-cover will-change-transform"
        style={{ transform: `translate3d(0, ${y * 0.35}px, 0) scale(1.05)` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-navy/95 via-navy/80 to-near-black/70" />
      <div className="pointer-events-none absolute -top-20 -left-20 w-80 h-80 rounded-full bg-brand/30 blur-3xl animate-blob" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-96 h-96 rounded-full bg-brand-light/25 blur-3xl animate-blob" style={{ animationDelay: "-6s" }} />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-20 w-full">
        <div className="max-w-3xl">
          <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-brand-light/20 text-brand-light text-xs sm:text-sm font-medium border border-brand-light/30 mb-4 sm:mb-6 shadow-sm">
            ⚡ Zero Hidden Charges · Verified Drivers
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
            Your Journey, <br className="sm:hidden" />
            <span className="text-brand-light shimmer-text">Our Responsibility</span>
          </h1>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-white/90 max-w-2xl leading-relaxed">
            Chauffeur-driven outstation cabs &amp; curated tour packages across India.
            Zero hidden charges.
          </p>
        </div>

        {/* Booking card */}
        <div className="mt-8 sm:mt-10 bg-background text-foreground rounded-2xl shadow-2xl shadow-black/30 p-4 sm:p-6">
          {/* Round trip toggle */}
          <div className="mb-4 flex items-center gap-3">
            <button
              type="button"
              role="switch"
              aria-checked={round}
              onClick={() => setRound((v) => !v)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${round ? "bg-brand" : "bg-muted"}`}
              aria-label="Toggle round trip"
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${round ? "translate-x-5" : "translate-x-0.5"}`}
              />
            </button>
            <span className="text-sm font-medium text-foreground">Round Trip</span>
            <span className="text-xs text-muted-foreground hidden sm:inline">
              {round ? "Return date enabled" : "Toggle for return journey"}
            </span>
          </div>

          {/* ── Trip Category Pills ── */}
          <div className="mb-4">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Trip Category</span>
            <div className="mt-2 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {CATEGORIES.map((cat) => {
                const active = category === cat.value;
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.value}
                    onClick={() => setCategory(cat.value)}
                    className={`trip-pill flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 border ${
                      active
                        ? "bg-brand text-brand-foreground border-brand shadow-md shadow-brand/25 scale-[1.02]"
                        : "bg-soft text-muted-foreground border-border hover:border-brand/40 hover:text-foreground hover:bg-brand/5"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 items-start">
            <Field label="From City">
              <input className="field bg-muted text-muted-foreground cursor-not-allowed" type="text" value="Mumbai" readOnly />
            </Field>

            {/* ── To City with Autocomplete ── */}
            <Field label="To City" error={errors.toCity}>
              <div className="relative">
                <input
                  ref={toCityRef}
                  className={`field ${errors.toCity ? 'border-red-500' : ''}`}
                  type="text"
                  placeholder="Search destination..."
                  value={toCity}
                  onChange={e => {
                    setToCity(e.target.value);
                    setErrors(p => ({ ...p, toCity: '' }));
                    setShowSuggestions(true);
                    setHighlightIdx(-1);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  onKeyDown={e => {
                    if (!showSuggestions) return;
                    if (e.key === "ArrowDown") { e.preventDefault(); setHighlightIdx(i => Math.min(i + 1, filteredDestinations.length - 1)); }
                    else if (e.key === "ArrowUp") { e.preventDefault(); setHighlightIdx(i => Math.max(i - 1, 0)); }
                    else if (e.key === "Enter" && highlightIdx >= 0) {
                      e.preventDefault();
                      setToCity(filteredDestinations[highlightIdx].name);
                      setShowSuggestions(false);
                    }
                    else if (e.key === "Escape") setShowSuggestions(false);
                  }}
                  autoComplete="off"
                />
                {showSuggestions && filteredDestinations.length > 0 && (
                  <div
                    ref={suggestRef}
                    className="suggest-dropdown absolute left-0 right-0 top-[calc(100%+4px)] bg-card border border-border rounded-xl shadow-2xl shadow-black/15 z-50 max-h-[260px] overflow-y-auto scrollbar-hide"
                  >
                    <div className="px-3 pt-2.5 pb-1.5">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        {toCity.trim() ? "Matching destinations" : "Popular destinations"}
                      </span>
                    </div>
                    {filteredDestinations.map((d, i) => (
                      <button
                        key={d.name}
                        className={`suggest-item w-full text-left px-3 py-2 flex items-center gap-3 transition-colors text-sm ${
                          highlightIdx === i ? "bg-brand/10 text-brand" : "hover:bg-soft text-foreground"
                        }`}
                        onMouseEnter={() => setHighlightIdx(i)}
                        onClick={() => {
                          setToCity(d.name);
                          setShowSuggestions(false);
                          setErrors(p => ({ ...p, toCity: '' }));
                        }}
                      >
                        <MapPin className="h-3.5 w-3.5 text-brand/60 shrink-0" />
                        <span className="font-medium">{d.name}</span>
                        <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-brand/8 text-brand/70 font-medium">{d.tag}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </Field>

            {/* ── Date Picker ── */}
            <Field label="Pickup Date" error={errors.date}>
              <div className="relative" ref={calRef}>
                <button
                  type="button"
                  onClick={() => { setShowCalendar(v => !v); setShowTimePicker(false); }}
                  className={`field text-left flex items-center gap-2 ${errors.date ? 'border-red-500' : ''} ${!selectedDate ? 'text-muted-foreground' : 'text-foreground'}`}
                >
                  <CalendarDays className="h-4 w-4 text-brand/60 shrink-0" />
                  <span>{formattedDate || "Select date"}</span>
                </button>

                {showCalendar && (
                  <div className="calendar-dropdown absolute left-0 top-[calc(100%+4px)] bg-card border border-border rounded-xl shadow-2xl shadow-black/15 z-50 p-3 w-[300px]">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-3">
                      <button onClick={prevMonth} className="h-8 w-8 rounded-lg hover:bg-soft flex items-center justify-center transition-colors" aria-label="Previous month">
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <span className="text-sm font-semibold text-foreground">
                        {MONTHS[calMonth]} {calYear}
                      </span>
                      <button onClick={nextMonth} className="h-8 w-8 rounded-lg hover:bg-soft flex items-center justify-center transition-colors" aria-label="Next month">
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                    {/* Weekday headers */}
                    <div className="grid grid-cols-7 mb-1">
                      {DAYS.map(d => (
                        <div key={d} className="text-center text-[10px] font-semibold text-muted-foreground uppercase py-1">{d}</div>
                      ))}
                    </div>
                    {/* Days grid */}
                    <div className="grid grid-cols-7 gap-0.5">
                      {calendarCells.map((cell, idx) => {
                        if (cell.outside) {
                          return <div key={`out-${idx}`} className="h-9 w-full flex items-center justify-center text-xs text-muted-foreground/30">{cell.day}</div>;
                        }
                        const disabled = isDateDisabled(cell.day);
                        const today = isToday(cell.day);
                        const selected = isSelected(cell.day);
                        return (
                          <button
                            key={`d-${cell.day}`}
                            disabled={disabled}
                            onClick={() => selectDay(cell.day)}
                            className={`cal-day h-9 w-full rounded-lg text-xs font-medium flex items-center justify-center transition-all duration-150 ${
                              disabled
                                ? "text-muted-foreground/30 cursor-not-allowed"
                                : selected
                                ? "bg-brand text-white shadow-md shadow-brand/30 scale-105"
                                : today
                                ? "bg-brand/15 text-brand font-bold ring-1 ring-brand/30"
                                : "text-foreground hover:bg-brand/10 hover:text-brand"
                            }`}
                          >
                            {cell.day}
                          </button>
                        );
                      })}
                    </div>
                    {/* Quick actions */}
                    <div className="flex justify-between items-center mt-3 pt-2 border-t border-border/60">
                      <button
                        onClick={() => { setSelectedDate(null); }}
                        className="text-[11px] text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Clear
                      </button>
                      <button
                        onClick={() => {
                          const today = new Date();
                          if (today >= minBookingDate) {
                            setSelectedDate(today);
                            setCalMonth(today.getMonth());
                            setCalYear(today.getFullYear());
                          } else {
                            setSelectedDate(minBookingDate);
                            setCalMonth(minBookingDate.getMonth());
                            setCalYear(minBookingDate.getFullYear());
                          }
                        }}
                        className="text-[11px] text-brand font-semibold hover:text-brand/80 transition-colors"
                      >
                        Earliest available
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </Field>

            {/* ── Time Picker ── */}
            <Field label="Pickup Time">
              <input
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="field w-full"
              />
            </Field>

            {round && (
              <Field label="Return Date" error={errors.returnDate}>
                <input className={`field ${errors.returnDate ? 'border-red-500' : ''}`} type="date" value={returnDate} onChange={e => { setReturnDate(e.target.value); setErrors(p => ({ ...p, returnDate: '' })) }} />
              </Field>
            )}
            <Field label="Passengers">
              <input
                className="field"
                type="number"
                min={1}
                max={17}
                value={passengers}
                onChange={e => setPassengers(e.target.value)}
                placeholder="No. of passengers"
              />
            </Field>
            <button onClick={handleSearch} className={`w-full bg-brand hover:bg-brand/90 text-brand-foreground rounded-lg font-semibold flex items-center justify-center gap-2 h-[52px] lg:mt-[22px] transition transform hover:-translate-y-0.5 ${round ? "" : "lg:col-start-3"}`}>
              <WhatsAppIcon className="h-5 w-5" /> Connect on WhatsApp
            </button>
          </div>
        </div>
        <p className="mt-2 text-center text-[11px] text-white/50">
          By booking, you agree to our{" "}
          <a href="/tnc" className="underline hover:text-white/80 transition">Terms &amp; Conditions</a>.
        </p>

        {/* Trust counters */}
        <div className="mt-6 sm:mt-8 grid grid-cols-3 gap-2 sm:gap-6">
          <Counter icon={<Users className="h-4 w-4 sm:h-5 sm:w-5" />} value={<CountUp to={12000} suffix="+" />} label="Happy Travellers" />
          <Counter icon={<Map className="h-4 w-4 sm:h-5 sm:w-5" />} value={<CountUp to={50} suffix="+" />} label="Destinations" />
          <Counter icon={<Star className="h-4 w-4 sm:h-5 sm:w-5" />} value={<><CountUp to={4.8} decimals={1} />★</>} label="Average Rating" />
        </div>

        {/* Mobile: 2x2 grid badges */}
        <div className="sm:hidden mt-4">
          <div className="grid grid-cols-2 gap-2">
            <Badge icon={<ShieldCheck className="h-3.5 w-3.5" />} text="Verified Drivers" />
            <Badge icon={<XCircle className="h-3.5 w-3.5" />} text="Free Cancellation" />
            <Badge icon={<Headphones className="h-3.5 w-3.5" />} text="24/7 Support" />
            <Badge icon={<MapPin className="h-3.5 w-3.5" />} text="GPS Tracked" />
          </div>
        </div>
        {/* Desktop: grid badges */}
        <div className="hidden sm:grid grid-cols-4 gap-3 mt-6 text-sm">
          <Badge icon={<ShieldCheck className="h-4 w-4" />} text="Verified Drivers" />
          <Badge icon={<XCircle className="h-4 w-4" />} text="Free Cancellation" />
          <Badge icon={<Headphones className="h-4 w-4" />} text="24/7 Support" />
          <Badge icon={<MapPin className="h-4 w-4" />} text="GPS Tracked" />
        </div>
      </div>

      <style>{`
        .field {
          width: 100%; height: 44px; padding: 0 12px;
          border-radius: 0.5rem; background: var(--color-soft);
          border: 1px solid var(--color-border); font-size: 0.875rem;
          color: var(--color-foreground); outline: none;
          cursor: pointer;
        }
        @media (min-width: 640px) { .field { height: 48px; font-size: 0.95rem; } }
        .field:focus { border-color: var(--color-brand); }
        input.field { cursor: text; }
        input.field[readonly] { cursor: not-allowed; }

        .calendar-dropdown, .time-dropdown, .suggest-dropdown {
          animation: dropIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-8px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .cal-day { position: relative; }
        .cal-day:not(:disabled):hover { transform: scale(1.1); }
        .cal-day:not(:disabled):active { transform: scale(0.95); }

        .suggest-item:last-child { border-radius: 0 0 0.75rem 0.75rem; }
        .suggest-item:first-of-type { border-radius: 0; }

        .trip-pill:active { transform: scale(0.96); }
      `}</style>
    </section>
  );
}

function Field({ label, children, error }: { label: string; children: React.ReactNode; error?: string }) {
  return (
    <label className="block">
      <div className="flex justify-between items-end">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</span>
      </div>
      <div className="mt-1.5">{children}</div>
      {error && <p className="mt-1 text-[10px] text-red-500 font-medium">{error}</p>}
    </label>
  );
}

function Badge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-white/10 border border-white/20 backdrop-blur-sm text-white justify-center sm:justify-start">
      <span className="text-brand-light shrink-0">{icon}</span>
      <span className="font-medium text-xs sm:text-sm whitespace-nowrap">{text}</span>
    </div>
  );
}

function Counter({ icon, value, label }: { icon: React.ReactNode; value: React.ReactNode; label: string }) {
  return (
    <div className="rounded-xl sm:rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm px-2 sm:px-4 py-3 sm:py-5 text-center">
      <div className="flex items-center justify-center gap-1 sm:gap-2 text-brand-light">
        <span className="hidden sm:inline">{icon}</span>
        <span className="text-xl sm:text-3xl font-bold text-white tabular-nums">{value}</span>
      </div>
      <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-sm text-white/75 leading-tight">{label}</p>
    </div>
  );
}
