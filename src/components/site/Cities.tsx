const cities = [
  { name: "Mumbai", trips: "320+", img: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=600&q=70" },
  { name: "Pune", trips: "240+", img: "https://images.unsplash.com/photo-1567606940710-7a36f5d33b14?auto=format&fit=crop&w=600&q=70" },
  { name: "Nashik", trips: "110+", img: "https://images.unsplash.com/photo-1587135941948-670b381f08ce?auto=format&fit=crop&w=600&q=70" },
  { name: "Aurangabad", trips: "90+", img: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=600&q=70" },
  { name: "Nagpur", trips: "130+", img: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=70" },
  { name: "Kolhapur", trips: "70+", img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=70" },
  { name: "Solapur", trips: "60+", img: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=600&q=70" },
  { name: "Shirdi", trips: "150+", img: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=600&q=70" },
];

export function Cities() {
  return (
    <section id="cities" className="py-12 sm:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-6 sm:mb-10">
          <h2 className="text-2xl sm:text-4xl font-bold text-navy">We Operate Across Maharashtra & Beyond</h2>
          <p className="mt-2 sm:mt-3 text-sm sm:text-base text-muted-foreground">Book a cab from any of these cities</p>
        </div>

        {/* Mobile: horizontal scroll carousel */}
        <div className="sm:hidden -mx-4 px-4">
          <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide after:content-[''] after:w-1 after:shrink-0">
            {cities.map((c) => (
              <div
                key={c.name}
                className="snap-start shrink-0 w-[140px] rounded-xl overflow-hidden border bg-card group"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={c.img}
                    alt={c.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-2.5 text-center">
                  <h3 className="font-bold text-navy text-sm">{c.name}</h3>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{c.trips} trips/mo</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: 4-col grid */}
        <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {cities.map((c) => (
            <div
              key={c.name}
              className="rounded-xl overflow-hidden border bg-card hover:shadow-xl transition group"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={c.img}
                  alt={c.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-navy">{c.name}</h3>
                <p className="text-sm text-muted-foreground mt-0.5">{c.trips} trips/month</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
