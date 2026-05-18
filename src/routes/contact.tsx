import { createFileRoute } from '@tanstack/react-router';
import { setPageMeta } from '@/lib/meta';
import { useEffect, useState } from 'react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import { Reveal } from '@/components/site/Reveal';
import { bookOnWhatsApp } from '@/lib/whatsapp';

export const Route = createFileRoute('/contact')({
  component: Contact,
});

function Contact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setPageMeta({
      title: "Contact Us | Manasvi Tours and Travels",
      description: "Get in touch with Manasvi Tours and Travels for outstation cabs and car rentals. Office in Panvel, Navi Mumbai.",
      url: "/contact",
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    bookOnWhatsApp({
      message: `Hi, I am ${name} (Phone: ${phone}).\n\nMessage: ${message}`
    });
  };

  return (
    <div className="pt-20 pb-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="text-center mb-16 pt-10">
            <h1 className="text-4xl sm:text-5xl font-bold text-navy mb-4">Contact <span className="text-brand">Us</span></h1>
            <p className="text-lg text-muted-foreground">We're here to help! Reach out for bookings or inquiries.</p>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <Reveal>
            <div className="space-y-8">
              <div className="flex items-start gap-4 p-6 bg-soft rounded-2xl border">
                <div className="bg-brand/10 p-3 rounded-full text-brand shrink-0">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-navy mb-1">Phone & WhatsApp</h3>
                  <p className="text-muted-foreground mb-2">Available 24/7 for bookings</p>
                  <a href="tel:+919821790471" className="text-lg font-semibold text-brand block hover:underline">+91 98217 90471</a>
                  <button onClick={() => window.open('https://wa.me/919821790471', '_blank')} className="mt-2 text-sm text-green-600 font-medium hover:underline">Chat on WhatsApp</button>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-soft rounded-2xl border">
                <div className="bg-brand/10 p-3 rounded-full text-brand shrink-0">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-navy mb-1">Email Address</h3>
                  <p className="text-muted-foreground mb-2">For corporate & bulk queries</p>
                  <a href="mailto:info@manasvitravel.com" className="text-lg font-semibold text-brand hover:underline">info@manasvitravel.com</a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-soft rounded-2xl border">
                <div className="bg-brand/10 p-3 rounded-full text-brand shrink-0">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-navy mb-1">Office Location</h3>
                  <p className="text-muted-foreground">Panvel, Navi Mumbai<br/>Maharashtra, India</p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <form onSubmit={handleSubmit} className="bg-card p-8 rounded-2xl border shadow-xl">
              <h3 className="text-2xl font-bold text-navy mb-6">Send us a message</h3>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-navy mb-1.5">Your Name</label>
                  <input required type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-3 rounded-lg border bg-soft focus:bg-white focus:border-brand outline-none transition" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-1.5">Mobile Number</label>
                  <input required type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="w-full px-4 py-3 rounded-lg border bg-soft focus:bg-white focus:border-brand outline-none transition" placeholder="+91 00000 00000" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-1.5">Message</label>
                  <textarea required rows={4} value={message} onChange={e => setMessage(e.target.value)} className="w-full px-4 py-3 rounded-lg border bg-soft focus:bg-white focus:border-brand outline-none transition resize-none" placeholder="How can we help you?"></textarea>
                </div>
                <button type="submit" className="w-full py-4 bg-brand hover:bg-brand/90 text-white rounded-lg font-bold flex items-center justify-center gap-2 transition">
                  <Send className="h-5 w-5" /> Send via WhatsApp
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
