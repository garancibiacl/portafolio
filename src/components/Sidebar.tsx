import { useState, useEffect, useMemo } from "react";
import { Home, User, Code, Briefcase, FolderGit2, FileText, Mail, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import type { LanguageCode } from "@/i18n/translations";

const iconMap = {
  hero: Home,
  about: User,
  skills: Code,
  services: Briefcase,
  projects: FolderGit2,
  cv: FileText,
  contact: Mail,
} as const;

export default function Sidebar() {
  const { copy, language, setLanguage, options } = useLanguage();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const navItems = copy.sidebar.navItems;

  const numberedOptions = useMemo(
    () => options.map((option, index) => ({ ...option, label: `${index + 1}. ${option.label}` })),
    [options]
  );

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/cv.pdf";
    link.download = copy.downloadFileName;
    link.click();
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden bg-sidebar border border-sidebar-border"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        aria-label={isMobileOpen ? copy.sidebar.mobileMenuAria.close : copy.sidebar.mobileMenuAria.open}
      >
        {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border z-40 transition-all duration-300",
          isCollapsed ? "w-16" : "w-64",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full p-4">
          {/* Logo/Brand */}
          <div className="flex items-center justify-between mb-8">
            {!isCollapsed && (
              <div className="flex items-center gap-2 animate-fade-in">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Code className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="font-bold text-lg text-foreground">{copy.sidebar.brand}</span>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="hidden lg:flex h-8 w-8"
              onClick={() => setIsCollapsed(!isCollapsed)}
              aria-label={copy.sidebar.toggleSidebarAria}
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>

          {!isCollapsed && (
            <div className="mb-6">
              <label htmlFor="language" className="block text-xs uppercase tracking-wide text-muted-foreground mb-2">
                {copy.languageSelectorLabel}
              </label>
              <select
                id="language"
                value={language}
                onChange={(event) => setLanguage(event.target.value as LanguageCode)}
                aria-label={copy.languageSelectorAria}
                className="w-full rounded-md border border-sidebar-border bg-sidebar px-3 py-2 text-sm text-sidebar-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {numberedOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {navItems.map((item) => {
              const Icon = iconMap[item.id as keyof typeof iconMap] ?? FileText;
              const isActive = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200",
                    "hover:bg-sidebar-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isActive && "bg-sidebar-accent text-primary font-medium",
                    !isActive && "text-sidebar-foreground hover:text-sidebar-accent-foreground",
                    isCollapsed && "justify-center"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {!isCollapsed && <span className="text-sm">{item.label}</span>}
                </button>
              );
            })}
          </nav>

          {/* CTA Button */}
          <Button
            className={cn(
              "w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90",
              isCollapsed && "px-0"
            )}
            onClick={handleDownload}
          >
            <FileText className="h-4 w-4" />
            {!isCollapsed && <span className="ml-2">{copy.sidebar.downloadCta}</span>}
          </Button>
        </div>
      </aside>
    </>
  );
}
