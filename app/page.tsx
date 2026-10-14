import Hero from "./components/Hero";
import About from "./components/About";
import SelectedProperties from "./components/SelectedProperties";
import Approach from "./components/Approach";
import Partnership from "./components/Partnership";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import FloatingWhatsApp from "./components/FloatingWhatsApp";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-[#030303]">
      <Hero />
      <About />
      <SelectedProperties />
      <Approach />
      <Partnership />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}

