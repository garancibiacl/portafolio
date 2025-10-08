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
  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      <Sidebar />
      <main className="flex-1 lg:ml-64 transition-all duration-300">
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
