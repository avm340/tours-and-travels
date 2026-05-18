import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";

export function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/919821790471"
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-5 right-5 z-50 h-14 w-14 rounded-full bg-[#25D366] text-white shadow-2xl shadow-black/30 flex items-center justify-center hover:scale-110 transition-transform"
    >
      <WhatsAppIcon className="h-7 w-7" />
      <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap bg-near-black text-white text-xs px-2.5 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
        Chat with us
      </span>
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
    </a>
  );
}
