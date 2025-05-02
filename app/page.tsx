"use client";

import HomeIntro from "../components/main/HomeIntro";
import About from "../components/main/About";
import Projects from "../components/main/Projects";
import Skills from "../components/main/Skills";
import Contact from "../components/main/Contact";

export default function Home() {
  return (
    <main className="bg-[#0a0a0a]">
      <section id="home" className="min-h-screen relative">
        <HomeIntro />
      </section>

      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a] via-[#2a2a2a] to-[#3a3a3a]"></div>
        <section id="about" className="min-h-screen relative z-[1]">
          <div className="mx-auto relative">
            <About />
          </div>
        </section>

        <section id="skills" className="min-h-screen relative z-[1]">
          <div className="mx-auto relative">
            <Skills />
          </div>
        </section>

        <section id="projects" className="min-h-screen relative z-[1]">
          <div className="mx-auto relative">
            <Projects />
          </div>
        </section>

        <section id="contact" className="min-h-screen relative z-[1]">
          <div className="mx-auto relative">
            <Contact />
          </div>
        </section>
      </div>
    </main>
  );
}
