import appMockup from "@/assets/app-mockup.png";
import { Apple, Smartphone } from "lucide-react";

export function AppBanner() {
  return (
    <section className="py-12 sm:py-20 bg-navy text-navy-foreground overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-8 sm:gap-10 items-center">
        <div>
          <h2 className="text-2xl sm:text-4xl font-bold leading-tight">
            Book Anytime, Anywhere — <span className="text-brand-light">Download Our App</span>
          </h2>
          <p className="mt-4 text-white/80">
            Get exclusive app-only discounts. Available on Android & iOS.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row flex-wrap gap-3">
            <button className="w-full sm:w-auto flex items-center justify-center gap-3 px-5 py-3 rounded-lg bg-black hover:bg-black/80 transition">
              <Smartphone className="h-6 w-6" />
              <div className="text-left leading-tight">
                <p className="text-[10px] text-white/70">GET IT ON</p>
                <p className="font-semibold">Google Play</p>
              </div>
            </button>
            <button className="w-full sm:w-auto flex items-center justify-center gap-3 px-5 py-3 rounded-lg bg-black hover:bg-black/80 transition">
              <Apple className="h-6 w-6" />
              <div className="text-left leading-tight">
                <p className="text-[10px] text-white/70">Download on the</p>
                <p className="font-semibold">App Store</p>
              </div>
            </button>
          </div>
        </div>
        <div className="relative flex justify-center">
          <div className="absolute inset-0 bg-brand/30 blur-3xl rounded-full" />
          <img
            src={appMockup}
            alt="Manasvi app on phone"
            loading="lazy"
            width={500}
            height={500}
            className="relative max-w-sm w-full drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}
