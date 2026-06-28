import { useState } from "react";
import { Calculator, Info, ArrowRight } from "lucide-react";

const rates = [
  { name: "Sedan (Maruti Swift)", rate: 14 },
  { name: "SUV (Toyota Rumion)", rate: 16 },
  { name: "SUV (Toyota Innova)", rate: 18 },
  { name: "Premium SUV (Innova Crysta)", rate: 20 },
  { name: "Tempo Traveller (Force Urbania)", rate: 35 },
];
const DRIVER_BATA = 300;

export function PriceCalculator() {
  const [km, setKm] = useState(100);
  const [tripType, setTripType] = useState("one-way");

  const multiplier = tripType === "round" ? 2 : 1;
  const totalKm = km * multiplier;

  return (
    <section className="py-12 sm:py-20 bg-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-4xl font-bold text-navy flex items-center justify-center gap-3">
            <Calculator className="h-6 w-6 sm:h-8 sm:w-8 text-brand" />
            Live Fare Calculator
          </h2>
          <p className="mt-3 text-muted-foreground">Estimate your travel cost instantly</p>
        </div>

        <div className="max-w-4xl mx-auto bg-card rounded-2xl shadow-xl overflow-hidden border">
          <div className="grid md:grid-cols-2">
            <div className="p-6 sm:p-8 bg-navy text-white">
              <h3 className="text-xl font-semibold mb-6 text-brand-light">Trip Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-white/80 mb-1.5">Estimated Distance (One-way KM)</label>
                  <input
                    type="number"
                    value={km}
                    onChange={(e) => setKm(Number(e.target.value) || 0)}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white outline-none focus:border-brand-light"
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/80 mb-1.5">Trip Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setTripType("one-way")}
                      className={`py-2.5 rounded-lg text-sm font-medium transition-colors ${tripType === "one-way" ? "bg-brand text-white" : "bg-white/10 text-white/70 hover:bg-white/20"}`}
                    >
                      One Way
                    </button>
                    <button
                      onClick={() => setTripType("round")}
                      className={`py-2.5 rounded-lg text-sm font-medium transition-colors ${tripType === "round" ? "bg-brand text-white" : "bg-white/10 text-white/70 hover:bg-white/20"}`}
                    >
                      Round Trip
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-white/70">Total Distance Calculated:</span>
                  <span className="font-bold text-lg">{totalKm} KM</span>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 bg-card">
              <h3 className="text-xl font-semibold mb-6 text-navy">Estimated Fares</h3>
              <div className="space-y-3">
                {rates.map((rate) => {
                  const baseFare = totalKm * rate.rate;
                  const total = baseFare + DRIVER_BATA;
                  return (
                    <div key={rate.name} className="flex items-center justify-between p-3 rounded-lg border border-soft hover:border-brand/30 transition-colors">
                      <div>
                        <p className="font-semibold text-navy text-sm sm:text-base">{rate.name}</p>
                        <p className="text-xs text-muted-foreground">₹{rate.rate}/km</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-brand sm:text-lg">₹{total.toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-6 flex items-start gap-2 text-xs text-muted-foreground bg-soft p-3 rounded-md">
                <Info className="h-4 w-4 shrink-0 text-brand mt-0.5" />
                <p> Tolls, parking, and state border taxes are extra as applicable.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
