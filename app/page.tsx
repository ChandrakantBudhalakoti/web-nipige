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
    <main className="bg-white">
      <Header />
      <Hero />
      <SolutionsCarousel />
      <HowItWorks />
      <ExclusiveOfferings />
      <ProductGallery />
      <CustomerLogos />
      <ContactSection />
      <Footer />
    </main>
  );
}
