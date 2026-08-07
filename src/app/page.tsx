import Hero from "@/components/Hero";
import StatusBar from "@/components/StatusBar";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <StatusBar />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
