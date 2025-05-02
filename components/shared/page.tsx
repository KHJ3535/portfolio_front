import About from "@/components/main/About";
import Contact from "@/components/main/Contact";
import HomeIntro from "@/components/main/HomeIntro";
import Projects from "@/components/main/Projects";
import Skills from "@/components/main/Skills";

export default function Home() {
  return (
    <main>
      <HomeIntro />
      <About />
      <Projects />
      <Skills />
      <Contact />
    </main>
  );
}
