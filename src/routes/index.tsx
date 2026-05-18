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
import { setPageMeta } from "@/lib/meta";

export const Route = createFileRoute("/")(
  {
    component: Index,
  },
);

function Index() {
  useEffect(() => {
    setPageMeta({
      title: "Manasvi Tours and Travels | Best Car Rental with Driver from Mumbai to India",
      description: "Book chauffeur-driven outstation cabs and curated tour packages across India. Transparent pricing, verified drivers, 24/7 support. Book in 60 seconds with Manasvi Tours.",
      url: "/"
    });
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
