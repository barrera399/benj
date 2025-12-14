import Image from "next/image";
import { PuzzlePage } from "@/components/pages/Puzzle";
import Introduction from "@/components/pages/Introduction";
import About from "@/components/pages/About";
import Skills from "@/components/pages/Skills";
import BasicCards from "@/components/pages/BasicCards";
import Timeline from "@/components/pages/Timeline";
import Experience from "@/components/pages/Experience";
import HomeBanner from "@/components/pages/HomeBanner";
import Contact from "@/components/pages/Contact";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-black font-sans">
      <Introduction />
      <About />
      <Skills />
      <Experience />
      <BasicCards />
      <Contact />
    </div>
  );
}
