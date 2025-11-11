import { MessageCircle } from "lucide-react";

const phoneNumber = "56993127198";
const message = encodeURIComponent(
  "Hola Gustavo, me gustaría conversar sobre tus servicios de aplicaciones web, páginas web, ecommerce, landing page y logotipos. ¿Podemos hablar?"
);

const whatsappHref = `https://wa.me/${phoneNumber}?text=${message}`;

export function WhatsAppButton() {
  return (
    <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8">
      <a
        href={whatsappHref}
        target="_blank"
        rel="noreferrer noopener"
        aria-label="Abrir chat de WhatsApp para solicitar servicios digitales"
        className="group inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#25D366]/40 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#128C7E]"
      >
        <MessageCircle className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
        <span className="hidden md:inline">¡Conversemos por WhatsApp!</span>
      </a>
    </div>
  );
}

export default WhatsAppButton;
