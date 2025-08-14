import SmoothScrollWrapper from '@/components/SmoothScrollWrapper';
import Hero from '@/components/Hero';
import Navigation from '@/components/Navigation';
import About from '@/components/About';
import Portfolio from '@/components/Portfolio';
import Mission from '@/components/Mission';
import Contact from '@/components/Contact';
import FilmTicker from '@/components/FilmTicker';

export default function Home() {
  return (
    <main className="relative">
        <Navigation />
        <Hero />
        <About />
        <Portfolio />
        <Mission />
        <FilmTicker />
        <Contact />

    </main>
  );
}
