import { HeroSection } from '@/components/sections/hero-v2';
import { AboutSection } from '@/components/sections/about';
import { ExperienceSection } from '@/components/sections/experience';
import { ProjectsSection } from '@/components/sections/projects';
import { ContactSection } from '@/components/sections/contact';

export default function Home() {
  return (
    <div className="relative">
      <HeroSection />
      <AboutSection />

      <ProjectsSection />

      <section id="experience">
        <ExperienceSection />
      </section>
    </div>
  );
}
