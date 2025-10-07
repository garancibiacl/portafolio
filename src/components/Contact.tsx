import { useState } from "react";
import { Mail, Linkedin, Github, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const contactIconMap = {
  linkedin: Linkedin,
  github: Github,
  email: Mail,
} as const;

export default function Contact() {
  const { toast } = useToast();
  const { copy } = useLanguage();
  const contact = copy.contact;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: contact.toast.missingFields.title,
        description: contact.toast.missingFields.description,
        variant: "destructive",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: contact.toast.invalidEmail.title,
        description: contact.toast.invalidEmail.description,
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch("/.netlify/functions/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (!response.ok) {
        const errorPayload = await response.json().catch(() => null);
        const errorMessage = errorPayload?.error ?? "Failed to submit contact form";
        throw new Error(errorPayload?.details ?? errorMessage);
      }

      toast({
        title: contact.toast.success.title,
        description: contact.toast.success.description,
      });

      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error(error);
      toast({
        title: contact.toast.error.title,
        description:
          error instanceof Error && error.message
            ? `${contact.toast.error.description}\n(${error.message})`
            : contact.toast.error.description,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="min-h-screen flex items-center justify-center px-6 lg:px-12 py-20 bg-black/50">
      <div className="max-w-5xl w-full">
        <div className="flex items-center gap-3 mb-12">
          <Mail className="h-8 w-8 text-primary" />
          <h2 className="text-4xl font-bold">{contact.heading}</h2>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-gradient-card border-border">
              <CardHeader>
                <CardTitle>{contact.introTitle}</CardTitle>
                <CardDescription>{contact.introDescription}</CardDescription>
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
          <Card className="lg:col-span-3 bg-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                {contact.formTitle}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="text-sm font-medium mb-2 block">
                    {contact.form.nameLabel}
                  </label>
                  <Input
                    id="name"
                    placeholder={contact.form.namePlaceholder}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-secondary border-border"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="text-sm font-medium mb-2 block">
                    {contact.form.emailLabel}
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={contact.form.emailPlaceholder}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-secondary border-border"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="text-sm font-medium mb-2 block">
                    {contact.form.messageLabel}
                  </label>
                  <Textarea
                    id="message"
                    placeholder={contact.form.messagePlaceholder}
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-secondary border-border resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow disabled:opacity-70"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? contact.form.submitting : contact.form.submit}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
