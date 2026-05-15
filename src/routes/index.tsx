import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Cars } from "@/components/site/Cars";
import { Tariff } from "@/components/site/Tariff";
import { Cities } from "@/components/site/Cities";
import { HowItWorks } from "@/components/site/HowItWorks";
import { WhyUs } from "@/components/site/WhyUs";
import { Deals } from "@/components/site/Deals";
import { Eligibility } from "@/components/site/Eligibility";
import { Testimonials } from "@/components/site/Testimonials";
import { Faq } from "@/components/site/Faq";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";
import { useEffect } from "react";

export const Route = createFileRoute("/")(
  {
    component: Index,
  },
);

function Index() {
  useEffect(() => {
    document.title = "Manasvi Tours and Travels — Outstation Cabs & Tour Packages from ₹899";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Chauffeur-driven outstation cabs & curated tour packages across Maharashtra. Transparent pricing, verified drivers, 24/7 support. Book in 60 seconds with Manasvi Tours and Travels.");
  }, []);

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <Navbar />
      <main>
        <Hero />
        <Reveal variant="up"><Cars /></Reveal>
        <Reveal variant="zoom"><Tariff /></Reveal>
        <Reveal variant="left"><Cities /></Reveal>
        <Reveal variant="up"><HowItWorks /></Reveal>
        <Reveal variant="right"><WhyUs /></Reveal>
        <Reveal variant="zoom"><Deals /></Reveal>
        <Reveal variant="left"><Eligibility /></Reveal>
        <Reveal variant="up"><Testimonials /></Reveal>
        <Reveal variant="up"><Faq /></Reveal>
      </main>
      <Footer />
    </div>
  );
}
