import { HeroSection } from '@/components/sections/hero';
import { AboutSection } from '@/components/sections/about';
import { ExperienceSection } from '@/components/sections/experience';

export default function Home() {
  return (
    <div className="relative">
      <HeroSection />
      <AboutSection />

      {/* 临时的项目和联系部分 (占位符,待后续开发) */}
      <section id="projects" className="bg-secondary/20 py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-foreground mb-4 text-3xl font-bold">项目作品</h2>
          <p className="text-muted-foreground">即将推出...</p>
        </div>
      </section>

      <section id="experience">
        <ExperienceSection />
      </section>

      <section id="contact" className="py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-foreground mb-4 text-3xl font-bold">联系方式</h2>
          <p className="text-muted-foreground">即将推出...</p>
        </div>
      </section>
    </div>
  );
}
