import Introduction from "@/components/pages/Introduction";
import About from "@/components/pages/About";
import Skills from "@/components/pages/Skills";
import BasicCards from "@/components/pages/BasicCards";
import Contact from "@/components/pages/Contact";

export default function Home() {
  return (
    <main className="relative flex min-h-screen w-full flex-col bg-background font-sans text-ink">
      <Introduction />
      <About />
      <Skills />
      <BasicCards />
      <Contact />
    </main>
  );
}
