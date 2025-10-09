import { useState, useRef, useEffect } from "react";
import { Mail, Linkedin, Github, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { SectionHeader } from "@/components/ui/section-header";

const contactIconMap = {
  linkedin: Linkedin,
  github: Github,
  email: Mail,
} as const;

export default function Contact() {
  const { toast } = useToast();
  const { copy } = useLanguage();
  const contact = copy.contact;
  const [isVisible, setIsVisible] = useState(false);
  const contactRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (contactRef.current) {
      observer.observe(contactRef.current);
    }

    return () => {
      if (contactRef.current) {
        observer.unobserve(contactRef.current);
      }
    };
  }, []);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    try {
      setIsSubmitting(true);

      const formPayload = new FormData();
      formPayload.append("name", formData.name);
      formPayload.append("email", formData.email);
      formPayload.append("message", formData.message);
      formPayload.append("_captcha", "false");

      const response = await fetch(
        "https://formsubmit.co/ajax/garancibiacl@gmail.com",
        {
          method: "POST",
          body: formPayload,
        }
      );

      if (!response.ok) {
        throw new Error("No se pudo enviar el formulario de contacto");
      }

      await response.json().catch(() => null);

      toast({
        title: contact.toast.success.title,
        description: contact.toast.success.description,
      });

      setFormData({ name: "", email: "", message: "" });
      form.reset();
    } catch (error) {
      console.error(error);
      toast({
        title: contact.toast.error.title,
        description: contact.toast.error.description,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={contactRef}
      className="min-h-screen flex items-center justify-center px-6 lg:px-12 py-20 overflow-x-hidden"
    >
      <div className="max-w-7xl w-full mx-auto">
        <SectionHeader
          icon={<MessageSquare className="h-8 w-8 text-primary" />}
          title={contact.heading}
          description={contact.subtitle}
          isVisible={isVisible}
        />

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card
              className="bg-card border-border shadow-card transition-all duration-300 hover:shadow-lg"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                transition:
                  "opacity 0.6s ease-out 0.2s, transform 0.6s ease-out 0.2s, box-shadow 0.3s",
              }}
            >
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  {contact.introTitle}
                </CardTitle>
                <p className="text-muted-foreground mt-1">
                  {contact.introDescription}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {contact.links.map((link) => {
                  const Icon = contactIconMap[link.type] ?? Mail;
                  const isExternal = link.href.startsWith("http");
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors"
                    >
                      <Icon className="h-5 w-5 text-primary" />
                      <span className="text-sm">{link.label}</span>
                    </a>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <Card
              className="bg-card border-border shadow-card transition-all duration-300 hover:shadow-lg h-full"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                transition:
                  "opacity 0.6s ease-out 0.3s, transform 0.6s ease-out 0.3s, box-shadow 0.3s",
              }}
            >
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  {contact.form.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="text-sm font-medium mb-2 block"
                    >
                      {contact.form.nameLabel}
                    </label>
                    <Input
                      id="name"
                      placeholder={contact.form.namePlaceholder}
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                      className="bg-secondary border-border"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="text-sm font-medium mb-2 block"
                    >
                      {contact.form.emailLabel}
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={contact.form.emailPlaceholder}
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                      className="bg-secondary border-border"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="text-sm font-medium mb-2 block"
                    >
                      {contact.form.messageLabel}
                    </label>
                    <Textarea
                      id="message"
                      placeholder={contact.form.messagePlaceholder}
                      rows={6}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      required
                      className="bg-secondary border-border resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow disabled:opacity-70"
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? contact.form.submitting
                      : contact.form.submit}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
