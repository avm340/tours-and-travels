import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { useEffect } from "react";
import { setPageMeta } from "@/lib/meta";
import { ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/tnc")({
  component: TnCPage,
});

const clauses = [
  {
    title: "Distance Limit",
    body: "Outstation travel is limited to a maximum of 300 km per day.",
  },
  {
    title: "Day Calculation",
    body: "A travel day is calculated from 6:00 AM to 11:30 PM and not on a 24-hour basis.",
  },
  {
    title: "Driver Allowances",
    body: "Any perks, allowances, or personal expenses provided to the driver are not included in the billing and shall be borne separately by the customer.",
  },
  {
    title: "Additional Charges",
    body: "Toll taxes, parking charges, and local/state permits (if applicable) are not included in the package and shall be paid directly by the customer.",
  },
  {
    title: "Driver Meals",
    body: "The customer is requested to arrange meals for the driver throughout the duration of the trip.",
  },
  {
    title: "Overnight Detention",
    body: "In the event the vehicle is detained overnight, additional charges for the driver's allowance and night halt will be applicable and billed accordingly.",
  },
  {
    title: "Mumbai Permit",
    body: "Mumbai entry permit charges are not included in the fare and will be charged separately.",
  },
  {
    title: "Jurisdiction",
    body: "All bookings and services are subject to Mumbai jurisdiction only. Any disputes arising from the use of our services shall be resolved exclusively under Mumbai jurisdiction.",
  },
];

function TnCPage() {
  useEffect(() => {
    setPageMeta({
      title: "Terms & Conditions | Manasvi Tours and Travels",
      description:
        "Read the terms and conditions for booking cabs with Manasvi Tours and Travels. Covers distance limits, day calculation, driver allowances, and jurisdiction.",
      url: "/tnc",
    });
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        {/* Hero banner */}
        <div className="bg-navy text-white py-12 sm:py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <ShieldCheck className="h-10 w-10 mx-auto mb-4 text-brand-light" />
            <h1 className="text-3xl sm:text-4xl font-bold">Terms &amp; Conditions</h1>
            <p className="mt-3 text-white/70 text-sm sm:text-base">
              Please read these terms carefully before booking with Manasvi Tours and Travels.
            </p>
          </div>
        </div>

        {/* Clauses */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-6">
          {clauses.map((c, i) => (
            <div
              key={c.title}
              className="flex gap-4 p-5 rounded-xl border bg-card hover:shadow-md transition"
            >
              <span className="shrink-0 h-8 w-8 rounded-full bg-brand/10 text-brand font-bold text-sm flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <div>
                <h2 className="font-semibold text-navy text-base">{c.title}</h2>
                <p className="mt-1 text-muted-foreground text-sm leading-relaxed">{c.body}</p>
              </div>
            </div>
          ))}

          <p className="text-xs text-muted-foreground text-center pt-4">
            Last updated: May 2026 &nbsp;|&nbsp; Manasvi Tours and Travels, Mumbai
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
