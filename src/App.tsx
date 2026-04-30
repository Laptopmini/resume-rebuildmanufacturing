import About from "./components/About";
import AIDisclosure from "./components/AIDisclosure";
import Contact from "./components/Contact";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Hairline from "./components/Hairline";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Stats from "./components/Stats";
import Wordmark from "./components/Wordmark";

export default function App() {
  return (
    <div data-testid="app-root" className="bg-bg text-ink min-h-screen">
      <Header />
      <main>
        <Hero />
        <Hairline />
        <About />
        <Hairline />
        <Stats />
        <Hairline />
        <Experience />
        <Hairline />
        <Skills />
        <Hairline />
        <Education />
        <Hairline />
        <Contact />
        <Hairline />
        <AIDisclosure />
        <Hairline />
      </main>
      <Wordmark />
    </div>
  );
}
