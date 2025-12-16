import Header from './components/Header';
import Hero from './components/Hero';
import SolutionsCarousel from './components/SolutionsCarousel';
import HowItWorks from './components/HowItWorks';
import ExclusiveOfferings from './components/ExclusiveOfferings';
import ProductGallery from './components/ProductGallery';
import CustomerLogos from './components/CustomerLogos';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function Home() {
  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="absolute -top-12 left-0 bg-primary text-white px-4 py-2 rounded hover:outline-none focus:outline-none focus:top-0 focus:ring-2 focus:ring-white transition-all"
      >
        Skip to main content
      </a>

      <Header />
      <main id="main-content" className="bg-white">
        <Hero />
        <SolutionsCarousel />
        <HowItWorks />
        <ExclusiveOfferings />
        <ProductGallery />
        <CustomerLogos />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
