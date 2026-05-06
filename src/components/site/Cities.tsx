const cities = [
  { name: "Mumbai", cars: 320, img: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=600&q=70" },
  { name: "Pune", cars: 240, img: "https://images.unsplash.com/photo-1567606940710-7a36f5d33b14?auto=format&fit=crop&w=600&q=70" },
  { name: "Nashik", cars: 110, img: "https://images.unsplash.com/photo-1587135941948-670b381f08ce?auto=format&fit=crop&w=600&q=70" },
  { name: "Aurangabad", cars: 90, img: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=600&q=70" },
  { name: "Nagpur", cars: 130, img: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=70" },
  { name: "Kolhapur", cars: 70, img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=70" },
  { name: "Solapur", cars: 60, img: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=600&q=70" },
  { name: "Shirdi", cars: 45, img: "https://images.unsplash.com/photo-1544963547-a755bef13c39?auto=format&fit=crop&w=600&q=70" },
];

export function Cities() {
  return (
    <section id="cities" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-navy">We Operate Across Maharashtra & Beyond</h2>
          <p className="mt-3 text-muted-foreground">Pick up your car in any of these cities</p>
        </div>
        <div className="flex gap-5 overflow-x-auto pb-4 -mx-4 px-4 snap-x">
          {cities.map((c) => (
            <div
              key={c.name}
              className="snap-start shrink-0 w-56 rounded-xl overflow-hidden border bg-card hover:shadow-xl transition group"
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
                <p className="text-sm text-muted-foreground mt-0.5">{c.cars}+ cars available</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
