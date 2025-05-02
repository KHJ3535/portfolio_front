"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { FaBook, FaArrowUp, FaEnvelope } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState("home");
  const { scrollYProgress } = useScroll();
  const pathname = usePathname();
  const isFeedbackPage = pathname === "/feedback";

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: "smooth",
      });
      setCurrentSection(sectionId);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("khj3535@naver.com");
    alert("이메일이 복사되었습니다.");
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "contact"];
      const scrollPosition = window.scrollY;
      const headerHeight = 64;

      // 현재 보이는 섹션
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { top } = element.getBoundingClientRect();

          // 섹션이 화면 상단에 가까울 때 해당 섹션으로
          if (Math.abs(top - headerHeight) < 100) {
            setCurrentSection(section);
            break;
          }
        }
      }

      // 홈 인트로 섹션
      const homeSection = document.getElementById("home");
      if (homeSection) {
        const { top } = homeSection.getBoundingClientRect();
        if (top > -100 && top < 100) {
          setCurrentSection("homeintro");
        }
      }

      // 스크롤 위치에 따라 헤더 표시/숨김 설정
      if (window.innerWidth >= 768) {
        // PC에서만 적용하기
        if (scrollPosition > 100 && currentSection !== "homeintro") {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentSection]);

  const menuItems = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Skills", id: "skills" },
    { name: "Projects", id: "projects" },
    { name: "Contact", id: "contact" },
    { name: "Feedback", id: "feedback", href: "/feedback" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: 0, opacity: 1 }}
        animate={{
          y: isScrolled ? -100 : 0,
          opacity: 1,
        }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="fixed w-full z-50 bg-[#1a1a1a]/80 backdrop-blur-sm md:transition-transform"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link
              href="/"
              className="text-xl font-bold text-gray-300 hover:text-white transition-colors"
            >
              KHJ
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href || `/#${item.id}`}
                  className="text-gray-300 hover:text-white transition-colors relative group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-300 transition-all duration-300 group-hover:w-full group-hover:bg-white" />
                </Link>
              ))}
            </nav>

            <button
              className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </motion.header>

      <motion.nav
        initial={{ opacity: 0, x: -50 }}
        animate={{
          opacity: currentSection === "homeintro" ? 0 : 1,
          x: currentSection === "homeintro" ? -50 : 0,
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0, 0.2, 1],
          opacity: { duration: 0.3 },
          x: { duration: 0.5 },
        }}
        className="fixed left-8 top-1/3 transform -translate-y-1/2 z-50 hidden md:block"
      >
        <div className="flex flex-col space-y-4">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href || `/#${item.id}`}
              className={`text-gray-300 hover:text-white transition-colors relative group ${
                currentSection === item.id ? "text-white" : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </motion.nav>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-[#1a1a1a]/95 backdrop-blur-sm z-40 md:hidden">
          <div className="pt-20 px-4">
            <nav className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href || `/#${item.id}`}
                  className="text-gray-300 hover:text-white transition-colors text-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      <motion.nav
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="fixed right-8 bottom-8 z-50 flex flex-col space-y-4 max-h-screen pointer-events-none hidden md:block"
      >
        <button
          onClick={scrollToTop}
          className="p-3 bg-gray-800/50 backdrop-blur-sm text-white rounded-full hover:bg-gray-700/50 transition-all duration-300 shadow-lg pointer-events-auto"
        >
          <FaArrowUp className="w-5 h-5" />
        </button>
        <button
          onClick={copyEmail}
          className="p-3 bg-gray-800/50 backdrop-blur-sm text-white rounded-full hover:bg-gray-700/50 transition-all duration-300 shadow-lg pointer-events-auto"
        >
          <FaEnvelope className="w-5 h-5" />
        </button>
      </motion.nav>

      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gray-300 origin-left z-50"
        style={{ scaleX }}
      />
    </>
  );
};

export default Header;
