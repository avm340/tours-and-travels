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
import { AppBanner } from "@/components/site/AppBanner";
import { Faq } from "@/components/site/Faq";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Manasvi Tours and Travels — Self Drive Car Rental from ₹999/day" },
      {
        name: "description",
        content:
          "Rent self-drive & chauffeur cars across Maharashtra. Zero deposit, unlimited km, doorstep delivery. Book in minutes with Manasvi Tours and Travels.",
      },
      { property: "og:title", content: "Manasvi Tours and Travels — Car Rental" },
      {
        property: "og:description",
        content: "Self-drive & chauffeur cars from ₹999/day. Zero deposit. Doorstep delivery.",
      },
    ],
  }),
  component: Index,
});

function Index() {
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
        <Reveal variant="zoom"><AppBanner /></Reveal>
        <Reveal variant="up"><Faq /></Reveal>
      </main>
      <Footer />
    </div>
  );
}
