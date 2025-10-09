import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import CV from "@/components/CV";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Index() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const mainClassName = isCollapsed
    ? "flex-1 transition-all duration-300 lg:ml-16"
    : "flex-1 transition-all duration-300 lg:ml-64";

  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      <Sidebar isCollapsed={isCollapsed} onToggleCollapse={() => setIsCollapsed((prev) => !prev)} />
      <main className={mainClassName}>
        <Hero />
        <About />
        <Skills />
        <Services />
        <Projects />
        <CV />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}
