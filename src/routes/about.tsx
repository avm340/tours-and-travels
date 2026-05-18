import { createFileRoute } from '@tanstack/react-router';
import { setPageMeta } from '@/lib/meta';
import { useEffect } from 'react';
import { CountUp } from '@/components/site/CountUp';
import { Users, Map, Star, Clock, ShieldCheck, Smile, Banknote } from 'lucide-react';
import { Reveal } from '@/components/site/Reveal';
import { WhyUs } from '@/components/site/WhyUs';
import { Navbar } from '@/components/site/Navbar';
import { Footer } from '@/components/site/Footer';

export const Route = createFileRoute('/about')({
  component: About,
});

const highlights = [
  { icon: Clock,       title: "15 Years of Experience",       desc: "Trusted by thousands of families and corporates since 2009." },
  { icon: ShieldCheck, title: "Safety First",                 desc: "Every vehicle is well-maintained and every driver is professionally trained." },
  { icon: Smile,       title: "Customer Satisfaction",        desc: "We go the extra mile to make every interaction seamless and stress-free." },
  { icon: Banknote,    title: "Affordable Premium Travel",    desc: "Premium, hassle-free service at prices accessible to everyone." },
];

function About() {
  useEffect(() => {
    setPageMeta({
      title: "About Us | Manasvi Tours and Travels",
      description: "Manasvi Tours and Travels — 15 years of trusted, safe, and comfortable chauffeur-driven car rental services across India.",
      url: "/about",
    });
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">

        {/* Hero banner */}
        <section className="py-16 sm:py-24 bg-navy text-white text-center px-4">
          <Reveal>
            <h1 className="text-4xl sm:text-6xl font-bold mb-6">
              About <span className="text-brand-light">Manasvi Tours</span>
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              15 years of delivering safe, comfortable, and reliable chauffeur-driven travel experiences across India.
            </p>
          </Reveal>
        </section>

        {/* Stats row */}
        <section className="py-12 sm:py-16 bg-background px-4">
          <div className="max-w-7xl mx-auto">
            <Reveal>
              <div className="grid md:grid-cols-3 gap-8 text-center mb-16">
                <div className="p-6 rounded-2xl bg-soft border">
                  <Users className="h-10 w-10 text-brand mx-auto mb-4" />
                  <h3 className="text-3xl font-bold text-navy mb-2"><CountUp to={12000} suffix="+" /></h3>
                  <p className="text-muted-foreground font-medium">Happy Customers</p>
                </div>
                <div className="p-6 rounded-2xl bg-soft border">
                  <Map className="h-10 w-10 text-brand mx-auto mb-4" />
                  <h3 className="text-3xl font-bold text-navy mb-2"><CountUp to={50} suffix="+" /></h3>
                  <p className="text-muted-foreground font-medium">Destinations Covered</p>
                </div>
                <div className="p-6 rounded-2xl bg-soft border">
                  <Star className="h-10 w-10 text-brand mx-auto mb-4" />
                  <div className="flex justify-center gap-1 mb-1">
                    {[1,2,3,4].map(i => (
                      <span key={i} className="text-yellow-400 text-2xl">★</span>
                    ))}
                    <span className="text-gray-300 text-2xl">★</span>
                  </div>
                  <p className="text-sm font-semibold text-navy">4 / 5</p>
                  <p className="text-muted-foreground font-medium mt-0.5">Average Rating</p>
                </div>
              </div>
            </Reveal>

            {/* About copy */}
            <Reveal>
              <div className="max-w-3xl mx-auto space-y-6 text-muted-foreground leading-relaxed text-base sm:text-lg mb-16">
                <p>
                  <span className="font-semibold text-navy">Manasvi Tours and Travels</span> is a trusted name in the travel industry, backed by{" "}
                  <span className="font-semibold text-navy">15 years of experience</span> in delivering safe, comfortable, and reliable chauffeur-driven car rental services. Over the years, we have built a reputation for excellence by putting our customers' comfort and safety at the heart of everything we do.
                </p>
                <p>
                  We specialize in a wide range of travel services tailored to suit every need — whether it's a quick local trip, a planned outstation journey, a timely airport transfer, a professional corporate travel arrangement, or a fully customized journey designed around your preferences. Every trip is handled by our team of professional, well-trained drivers operating well-maintained vehicles, ensuring you travel in comfort and style every single time.
                </p>
                <p>
                  At Manasvi Tours and Travels, we understand that a great journey is about more than just reaching your destination — it's about the experience along the way. That's why we place a strong emphasis on punctuality, ensuring you always reach on time, every time. Our commitment to customer satisfaction means we go the extra mile to make every interaction seamless and stress-free, from the moment you book to the moment you arrive.
                </p>
                <p>
                  We believe that premium travel should be accessible to everyone, which is why we offer hassle-free service at affordable prices — because a smooth, comfortable, and memorable journey shouldn't come at a premium.
                </p>
                <p className="text-xl font-semibold text-navy text-center pt-4 italic">
                  "Your Journey. Our Responsibility."
                </p>
              </div>
            </Reveal>

            {/* Highlights grid */}
            <Reveal>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
                {highlights.map((h) => (
                  <div key={h.title} className="p-6 rounded-2xl bg-soft border hover:shadow-lg transition text-center">
                    <h.icon className="h-9 w-9 text-brand mx-auto mb-3" />
                    <h3 className="font-bold text-navy mb-1 text-sm sm:text-base">{h.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">{h.desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <WhyUs />
      </main>
      <Footer />
    </div>
  );
}
